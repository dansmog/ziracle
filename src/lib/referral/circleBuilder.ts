import { getUserById, getUserCircles, insertReferralCircle } from "@/lib/supabase/queries";

// Chain Walker - walks backwards through referral chain
export async function getReferralChain(
  referrerId: number
): Promise<Array<{ userId: number; level: number }>> {
  const chain: Array<{ userId: number; level: number }> = [];
  let currentUserId = referrerId;
  let level = 1;

  try {
    while (currentUserId && level <= 3) {
      // Add current user to chain
      chain.push({ userId: currentUserId, level });

      // Get the current user's referrer
      const userResult = await getUserById(currentUserId);
      if (!userResult.success || !userResult.data?.referred_by) {
        break; // End of chain
      }

      currentUserId = userResult.data.referred_by;
      level++;
    }
  } catch (error) {
    console.error("Error building referral chain:", error);
  }

  return chain;
}

// Circle Builder - creates all circle relationships
export async function buildReferralCircles(
  newUserId: number,
  referrerId: number
): Promise<void> {
  try {
    // Get the referral chain
    const chain = await getReferralChain(referrerId);

    // Create circle relationships for each person in the chain
    for (const { userId, level } of chain) {
      await insertReferralCircle({
        user_id: userId,
        member_id: newUserId,
        circle_level: level,
      });
    }

    console.log(
      `Created ${chain.length} circle relationships for user ${newUserId}`
    );
  } catch (error) {
    console.error("Error building referral circles:", error);
    throw error;
  }
}

// Helper function to get circle counts
export async function getCircleCounts(userId: number) {
  try {
    const circlesResult = await getUserCircles(userId);

    if (!circlesResult.success) {
      return { inner: 0, mid: 0, outer: 0, full: 0 };
    }

    const counts = {
      inner: 0,
      mid: 0,
      outer: 0,
      full: 0,
    };

    circlesResult.data?.forEach((circle: any) => {
      switch (circle.circle_level) {
        case 1:
          counts.inner++;
          break;
        case 2:
          counts.mid++;
          break;
        case 3:
          counts.outer++;
          break;
      }
    });

    counts.full = counts.inner + counts.mid + counts.outer;

    return counts;
  } catch (error) {
    console.error("Error getting circle counts:", error);
    return { inner: 0, mid: 0, outer: 0, full: 0 };
  }
}
