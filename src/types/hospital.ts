import { Key, ReactNode } from "react";

export type Hospital = {
  location: string;
  id: Key | null | undefined;
  address: string;
  formatted_phone_number: ReactNode;
  formatted_address: ReactNode;
  business_status: string;
  wheelchair_accessible_entrance: boolean;
  icon?: string;
  icon_background_color?: string;
  icon_mask_base_uri?: string;
  name: string;
  opening_hours: { open_now: boolean };
  place_id: string;
  price_level: number;
  rating?: number;
  reference: string;
  scope: string;
  types?: string[];
  user_ratings_total: number;
  vicinity: string;
  wheelchair_accessible: boolean;
};