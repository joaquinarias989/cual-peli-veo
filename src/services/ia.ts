const COHERE_API_KEY = import.meta.env['VITE_COHERE_API_KEY'];
const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate';

export interface PreferencesInput {
  decade: number;
  movieOfReference: string;
}

export async function findRecommendedMovies(preferences: PreferencesInput) {
  const data = {
    model: 'xlarge',
    prompt: `This is a movie recommender, to which you indicate a preferred decade in which the movie was released, a reference movie, and it returns another 2 or 3 movies that you might like based on your preferences.

Decade: 90's
Reference Movie: "El Padrino"
Recommendations: "Scarface", "Goodfellas"
--
Decade: 80's
Reference Movie: "Interestellar"
Recommendations: "Contact", "Explorers"
--
Decade: ${preferences.decade}'s
Reference Movie: "${preferences.movieOfReference}"
Recommendations:`,
    max_tokens: 100,
    temperature: 0.5,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ['--'],
    return_likelihoods: 'NONE',
  };

  const response = await fetch(COHERE_API_GENERATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${COHERE_API_KEY}`,
      'Cohere-Version': '2022-12-06',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  const { text } = response.generations[0];
  const cleanText = text.replace(/--/g, '');
  const recommendations = cleanText
    .split(',')
    .map((item: string) => item.trim().replace(/"/g, ''));
  return recommendations;
}
