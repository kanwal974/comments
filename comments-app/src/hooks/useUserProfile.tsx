import { useEffect, useState } from "react";
import { fetchCurrentuser } from "../features/comments/api/fetchCurrentuser";
import { IUserProfile } from "../types";

const useUserProfile = (): IUserProfile | null => {
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);

  const getCurrentUser = async () => {
    try {
      const response = await fetchCurrentuser();
      setUserProfile(response);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return userProfile;
};

export default useUserProfile;
