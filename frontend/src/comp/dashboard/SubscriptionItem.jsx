import React from "react";
import { getLogoPath } from "./utils/getLogoPath";

function SubscriptionItem({ subscription }) {
  return (
    <div className="subscription-item flex items-center gap-2 py-2">
      <img
        src={getLogoPath(subscription.name)}
        alt={subscription.name}
        className="subscription-logo w-8 h-8 object-contain"
        onError={(e) => {
          e.target.src = "/Logos/default.png";
        }}
      />
      <span>{subscription.name}</span>
    </div>
  );
}

export default SubscriptionItem;
