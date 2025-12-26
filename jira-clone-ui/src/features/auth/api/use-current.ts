import { useQuery } from "@tanstack/react-query";

export const useCurrent = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock user data
      return {
        $id: "user-1",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $collectionId: "users",
        $databaseId: "db-1",
        $permissions: [],
        name: "Demo User",
        email: "demo@example.com",
      };
    },
  });

  return query;
};
