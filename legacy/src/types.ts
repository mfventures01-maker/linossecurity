export type Category = 'solar' | 'cctv' | 'access-control' | 'gate-automation' | 'perimeter-security' | 'estate-security';
export type Availability = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: Category;
  availability: Availability;
  features?: string[];
  specs?: Record<string, string>;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  seo_description?: string;
  whatsapp_link?: string;
  json_id?: string;
}
