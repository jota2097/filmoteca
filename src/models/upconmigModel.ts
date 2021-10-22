export interface ITimelineMovies {
    dates:         IDates;
    page:          number;
    results:       IMovies[];
    total_pages:   number;
    total_results: number;
}

export interface IDates {
    maximum: Date;
    minimum: Date;
}

export interface IMovies {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    original_language: OriginalLanguage;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      Date;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export enum OriginalLanguage {
    En = "en",
    Ja = "ja",
    Ru = "ru",
}
