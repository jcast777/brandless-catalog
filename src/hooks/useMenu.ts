import { useEffect, useState } from 'react';
import { Menu as MenuType, menuApi } from '@/lib/api';

export function useMenu(location: string) {
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        const response = await menuApi.getMenu(location);
       
        // Convert the response to an array of MenuType if it exists
        if (response) {
          // Map the API's Menu type to MenuType
          const now = new Date().toISOString();
          
          const menus = response.map((menu: MenuType) => {
            return {
              id: menu.id,
              name: menu.name,
              slug: menu.slug,
              description: menu.description,
              location: menu.location,
              is_active: true,
              items: menu.items || [],
              created_at: now,
              updated_at: now,
              settings: {}
            };
          })
          
          setMenus(menus);
        } else {
          setMenus([]);
        }
      } catch (err) {
        console.error('Error fetching menus:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch menus'));
        setMenus([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [location]);

  return { menus, loading, error };
}
