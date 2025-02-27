export interface Post {
  id: number;
  name: string;
  description: string;
  createdAt: string; // ISO format date string
  updatedAt: string; // ISO format date string
}

export interface PostRequestSuccess {
  posts: Post[];
  total: number;
}

export interface Set {
  id: string;
  name: string;
  series: string;
  release_date: string;
  logo_url: string;
  symbol_url: string;
}

export interface Card {
  id: string;
  name: string;
  number: string;
  rarity: string;
  set_id: string;
  subtypes: string[];
  supertype: string;
  types: string[];
}


export interface CardDetails extends Card {
  images: { url: string; type: string }[];
  market_info: {
    url: string | null;
    updated_at: string | null;
    market: string | null;
  };
}

export interface FetchSetsResponse {
  sets: Set[];
}

export interface FetchCardsResponse {
  cards: Card[];
}
