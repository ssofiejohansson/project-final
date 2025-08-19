import useSubscriptionStore from "../stores/useSubscriptionStore"

export const CalculateCost = () => {

  const selectedSub = useSubscriptionStore((s) => s.selectedSubSave);

   if (!selectedSub) {
    return <div>No subscription selected</div>;
  }

  return (
    <div>
      You just saved {(selectedSub.cost ?? 0) * 12}, buy a friend dinner!
    </div>
  );
}