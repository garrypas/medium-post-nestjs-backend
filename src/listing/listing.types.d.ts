export type ListingBase = {
  name: string;
  description: string;
  agreedToTermsAndConditions: boolean;
  travelOptionId: string;
  createdBy: string;
};

export type Listing = {
  id: string;
} & ListingBase;
