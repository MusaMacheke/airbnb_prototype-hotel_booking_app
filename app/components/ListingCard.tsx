import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButtons";
import { DeleteFromFavorite, addToFavorite } from "../actions";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
}

export function ListingCard({
  description,
  imagePath,
  location,
  price,
  userId,
  favoriteId,
  homeId,
  isInFavoriteList,
  pathName,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  console.log(imagePath);

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
      
        <Image
          src={`https://gvzcmwiczvycwojjdood.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of House"
          fill
          className="rounded-lg h-full object-cover"
        />

        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${homeId}`} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> / Night
        </p>
      </Link>
    </div>
  );
}


// import Image from "next/image";
// import Link from "next/link";
// import { useCountries } from "../lib/getCountries";
// import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButtons";
// import { DeleteFromFavorite, addToFavorite } from "../actions";
// import { loadStripe } from '@stripe/stripe-js';
// import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
// "use client";
// const stripePromise = loadStripe('pk_test_51QXjQxKBDvO7rfURE6MGmtoDtYCm4Fbt10vyWp3orcjqpz3qD0cOqBQxjNA71cwTXlyKlRGjvmDBGvGjtP2vDZJ100hcUsAiJp');

// interface iAppProps {
//   imagePath: string;
//   description: string;
//   location: string;
//   price: number;
//   userId: string | undefined;
//   isInFavoriteList: boolean;
//   favoriteId: string;
//   homeId: string;
//   pathName: string;
//   paymentIntentId: string;
// }

// export function ListingCard({
//   description,
//   imagePath,
//   location,
//   price,
//   userId,
//   favoriteId,
//   homeId,
//   isInFavoriteList,
//   pathName,
//   paymentIntentId,

// }: iAppProps) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const { getCountryByValue } = useCountries();
//   const country = getCountryByValue(location);
//   // console.log(imagePath);
//   if (!stripe) {
//     console.error('Stripe context is not initialized');
//     return;
//   }

// const handlePayment = async () => {
//   const cardElement = elements?.getElement(CardElement);
//   if (!cardElement) {
//     console.error('Card element not found');
//     return;
//   }

//   const { error, paymentMethod } = await stripe.createPaymentMethod({
//     card: cardElement,
//   });

//   if (!error) {
//     const { paymentIntent } = await stripe?.confirmCardPayment(paymentIntentId, {
//       payment_method: paymentMethod.id,
//     });

//     if (paymentIntent?.status === 'succeeded') {
//       console.log('Payment successful!');
//     } else {
//       console.log('Payment failed:', paymentIntent?.status);
//     }
//   } else {
//     console.log('Error creating payment method:', error);
//   }
// };

//   return (
//     <div className="flex flex-col">
//       <div className="relative h-72">
      
//         <Image
//           src={`https://gvzcmwiczvycwojjdood.supabase.co/storage/v1/object/public/images/${imagePath}`}
//           alt="Image of House"
//           fill
//           className="rounded-lg h-full object-cover"
//         />

//         {userId && (
//           <div className="z-10 absolute top-2 right-2">
//             {isInFavoriteList ? (
//               <form action={DeleteFromFavorite}>
//                 <input type="hidden" name="favoriteId" value={favoriteId} />
//                 <input type="hidden" name="userId" value={userId} />
//                 <input type="hidden" name="pathName" value={pathName} />
//                 <DeleteFromFavoriteButton />
//               </form>
//             ) : (
//               <form action={addToFavorite}>
//                 <input type="hidden" name="homeId" value={homeId} />
//                 <input type="hidden" name="userId" value={userId} />
//                 <input type="hidden" name="pathName" value={pathName} />
//                 <AddToFavoriteButton />
//               </form>
//             )}
//           </div>
//         )}
//       </div>

//       <Link href={`/home/${homeId}`} className="mt-2">
//         <h3 className="font-medium text-base">
//           {country?.flag} {country?.label} / {country?.region}
//         </h3>
//         <p className="text-muted-foreground text-sm line-clamp-2">
//           {description}
//         </p>
//         {/* <p className="pt-2 text-muted-foreground">
//           <span className="font-medium text-black">${price}</span> Night
//         </p> */}
//       </Link>
//       <Elements stripe={stripe}>
//         <CardElement />
//         <button onClick={handlePayment}>Pay ${price}</button>
//       </Elements>
//     </div>
    
//   );
// }