import type { SearchPreferences } from '../types/SearchPreferences.type';

const COHERE_API_KEY = import.meta.env['PUBLIC_COHERE_API_KEY'];
const COHERE_API_GENERATE_URL = import.meta.env[
  'PUBLIC_COHERE_API_GENERATE_URL'
];

export async function generateRecommendedMovies(
  preferences: SearchPreferences
) {
  if (COHERE_API_KEY === undefined) {
    return null;
  }
  const data = {
    model: 'xlarge',
    prompt: `This is a movie recommender, to which you indicate a preferred decade in which the movie was released, a reference movie, and it returns another three movies that you might like based on your preferences. Recommendations will not be repeated, and the reference movie will not be included in the recommendations.

Decade: 90's
Reference Movie: "El Padrino"
Recommendations: "Scarface", "Goodfellas", "Casino"
--
Decade: 80's
Reference Movie: "Interestellar"
Recommendations: "Contact", "Explorers", "The Abyss"
--
Decade: 60's
Reference Movie: "Vertigo"
Recommendations: "Psycho", "The Birds", "Carnival of Souls"
--
Decade: 70's
Reference Movie: "The Shining"
Recommendations: "The Exorcist", "Rosemary's Baby", "The Omen"
--
Decade: ${preferences.decade}
Reference Movie: "${preferences.referenceMovie}"
Recommendations:`,
    max_tokens: 200,
    temperature: 0.5,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ['--'],
    return_likelihoods: 'NONE',
  };

  const response = await sendRequestCohere(data);
  if (response === null) {
    return null;
  }
  const { text } = response.generations[0];
  const cleanText = text.replace(/--/g, '');
  const recommendations = cleanText
    .split(',')
    .map((item: string) => item.trim().replace(/"/g, ''));
  return recommendations;
}

const sendRequestCohere = async (data: any) => {
  const response = await fetch(COHERE_API_GENERATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${COHERE_API_KEY}`,
      'Cohere-Version': '2022-12-06',
    },
    body: JSON.stringify(data),
  });
  if (response.status == 401) {
    return null;
  }
  return response.json();
};
