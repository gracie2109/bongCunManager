import { formatPrice } from "@/lib/utils";
import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";

export const useCartLocal = defineStore("cartLocal", () => {
  const carts: Ref<any[]> = ref([
    {
      id: "sNzMj8yWPFYEAAzgzIVp",
      image:
        "https://firebasestorage.googleapis.com/v0/b/netflix-react-70f52.appspot.com/o/product%2Fproduct-9.jpg?alt=media&token=628cc205-6491-4ba2-9ba9-61821387e804",
      name: "catcatcat",
      quantity: 6,
      price: 123000,
      variant: "XL",
    },
    {
      id: "sNzMj8yWPFYEAAzgzIVp123",
      image:
        "https://firebasestorage.googleapis.com/v0/b/netflix-react-70f52.appspot.com/o/product%2Fproduct-9.jpg?alt=media&token=628cc205-6491-4ba2-9ba9-61821387e804",
      name: "catcatcat",
      quantity: 2,
      price: 13000,
      variant: "M",
    },
  ]);
  const cartTotal = computed(() => {
    const res = carts.value.reduce(
      (acc, curr) => acc + (+curr.price * +curr.quantity || 0),
      0
    );
    return formatPrice(res);
  });

  const updateQuanty = (quantity: number, id: string) => {
    const index = carts.value.findIndex((i) => i.id === id);
    if (index !== -1) {
      carts.value[index] = {
        ...carts.value[index],
        quantity: quantity,
      };
    }
  };
  function clearCart() {
    carts.value = [];
  }

  const deleteCartItem = (data: any) => {
    carts.value = carts.value.filter((i) => i.id !== data.id);
  };

  const addToCart= (data: any) => {
    
  }


  return { carts,cartTotal, updateQuanty, clearCart, deleteCartItem };
});
