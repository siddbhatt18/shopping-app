// src/hooks/useCart.js
'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, addToCart, removeFromCart, updateCartItem } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export function useCart() {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id);
    });
  }, []);

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart', userId],
    queryFn: () => getCart(userId),
    enabled: !!userId,
  });

  const addMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', userId]);
    },
  });

  const removeMutation = useMutation({
    mutationFn: ({ itemId }) => removeFromCart(userId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', userId]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ itemId, data }) => updateCartItem(userId, itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', userId]);
    },
  });

  return {
    cart: cart?.data,
    isLoading,
    addToCart: addMutation.mutate,
    removeFromCart: removeMutation.mutate,
    updateCartItem: updateMutation.mutate,
  };
}