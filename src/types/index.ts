/**
 * Survey form submission data structure
 */
export interface SurveyFormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

/**
 * Creative team member
 */
export interface CreativeMember {
  role: string;
  name: string;
  highlight?: string;
  image?: string;
}

/**
 * Improvisational actor / cast member
 */
export interface CastMember {
  name: string;
  role: string;
  archetype: string;
  persona?: string;
  alias?: string;
  avatarGradient: string;
  borderGlow: string;
  avatarSymbol?: string;
  image?: string;
  images?: string[];
}

/**
 * Ticket category details
 */
export interface TicketTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  period?: string;
  badge?: string;
  badgeType?: 'primary' | 'hot' | 'value';
  description: string;
  features?: string[];
  isPopular?: boolean;
}

/**
 * Show session schedule
 */
export interface ShowSession {
  dateDisplay: string;
  dayOfWeek: string;
  timeDisplay: string;
  note: string;
}
