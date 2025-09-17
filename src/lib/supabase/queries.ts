import { createClient } from "@/utils/supabase/server";

export async function getUserByEmail(email: string) {
  console.log("the email, inside the query function", email);
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("users")
      .select("email, referral_code")
      .eq("email", email);

    if (error) {
      if (error.code === "PGRST116") {
        return { success: false, message: "User not found" };
      }
      return { success: false, message: error.message };
    }

    console.log("the data from supabase", data);

    return { success: true, data };
  } catch (err) {
    console.error("An unexpected error occurred:", err);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function createWaitlistUser(userData: {
  email: string;
  referral_code: string;
  referred_by: number | null;
}) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("users")
      .insert({
        ...userData,
      })
      .select()
      .single();
    if (error) {
      console.error("Supabase insert error:", error.message);
      return { success: false, message: error.message };
    }

    return { success: true, data: data };
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function getUserById(userId: number) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to find user by ID" };
  }
}

// Add to your existing queries file
export async function getUserByReferralCode(referralCode: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("referral_code", referralCode)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to find user by referral code" };
  }
}

export async function insertReferralCircle(payload: {
  user_id: number;
  member_id: number;
  circle_level: number;
}) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("referral_circles")
      .insert(payload)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to create circle relationship" };
  }
}

export async function getUserCircles(userId: number, circleLevel?: number) {
  const supabase = await createClient();
  try {
    let query = supabase
      .from("referral_circles")
      .select(
        `
        circle_level,
        member:users!referral_circles_member_id_fkey (
          id,
          email,
          first_name,
          last_name,
          referral_code,
          created_at
        )
      `
      )
      .eq("user_id", userId);

    if (circleLevel) {
      query = query.eq("circle_level", circleLevel);
    }

    const { data, error } = await query.order("circle_level");

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to get user circles" };
  }
}

// Get circle counts for a user
export async function getUserCircleCounts(userId: number) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("referral_circles")
      .select("circle_level")
      .eq("user_id", userId);

    if (error) {
      return { success: false, message: error.message };
    }

    const counts = {
      inner_circle: 0,
      mid_circle: 0,
      outer_circle: 0,
    };

    // Handle case where data might be null or empty
    if (data && Array.isArray(data)) {
      data.forEach((circle: { circle_level: number }) => {
        switch (circle.circle_level) {
          case 1:
            counts.inner_circle++;
            break;
          case 2:
            counts.mid_circle++;
            break;
          case 3:
            counts.outer_circle++;
            break;
        }
      });
    }

    return { success: true, data: counts };
  } catch (error) {
    console.error("Error in getUserCircleCounts:", error);
    return { success: false, message: "Failed to get circle counts" };
  }
}

export async function getDirectReferralCount(userId: number) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id", { count: "exact" })
      .eq("referred_by", userId);

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, data: data?.length || 0 };
  } catch (error) {
    return { success: false, message: "Failed to get direct referral count" };
  }
}

export async function getUserNetworkRanking(userId: number) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("referral_circles")
      .select("user_id");

    if (error) {
      return { success: false, message: error.message };
    }

    const networkCounts = new Map<number, number>();
    data?.forEach((circle: { user_id: number }) => {
      networkCounts.set(
        circle.user_id,
        (networkCounts.get(circle.user_id) || 0) + 1
      );
    });

    const { count: totalUsers, error: countError } = await supabase
      .from("users")
      .select("id", { count: "exact" });

    if (countError) {
      return { success: false, message: "Failed to get total users" };
    }

    const userNetworkCount = networkCounts.get(userId) || 0;

    let rank = 1;
    for (const [_, count] of networkCounts) {
      if (count > userNetworkCount) {
        rank++;
      }
    }

    return {
      success: true,
      data: {
        rank,
        total_users: totalUsers || 0,
        total_network: userNetworkCount,
      },
    };
  } catch (error) {
    console.error("Error in getUserNetworkRanking:", error);
    return { success: false, message: "Failed to get user ranking" };
  }
}

export async function getUserByReferralCodeWithCircles(referralCode: string) {
  try {
    // Get user data
    const userResult = await getUserByReferralCode(referralCode);
    if (!userResult.success) {
      return userResult;
    }

    const user = userResult.data;

    // Get circle counts with proper fallback
    const circleCountsResult = await getUserCircleCounts(user.id);
    const circleCounts =
      circleCountsResult.success && circleCountsResult.data
        ? circleCountsResult.data
        : {
            inner_circle: 0,
            mid_circle: 0,
            outer_circle: 0,
          };

    // Get direct referral count with proper fallback
    const directReferralResult = await getDirectReferralCount(user.id);
    const directReferrals =
      directReferralResult.success && directReferralResult.data !== undefined
        ? directReferralResult.data
        : 0;

    // Calculate total network
    const totalNetwork =
      circleCounts.inner_circle +
      circleCounts.mid_circle +
      circleCounts.outer_circle;

    const rankingResult = await getUserNetworkRanking(user?.id);
    const ranking = rankingResult.success
      ? rankingResult?.data
      : {
          rank: null,
          total_users: 0,
          total_network: totalNetwork,
        };

    const enhancedData = {
      ...user,
      circle: circleCounts,
      total_network: totalNetwork,
      direct_invites: circleCounts.inner_circle,
      direct_referrals: directReferrals,
      ranking: {
        ...ranking,
      },
    };

    return { success: true, data: enhancedData };
  } catch (error) {
    return { success: false, message: "Failed to get user with circle data" };
  }
}
