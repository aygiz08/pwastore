/*
  Copyright 2022 Sandoche ADITTANE & Farbod SARAF

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import localDataService from './localDataService'
const gplay = require('google-play-scraper').memoized();

const getResults = async function (query) {
  const googlePlayResults = await gplay.search({
    term: query,
    num: 3
  });
  const localWebsitesResults = localDataService.searchLocalAppData(query)

  let results = googlePlayResults

  for (const websiteData of localWebsitesResults) {
    const website = websiteData.item
    const appId = website.appId

    const existingAppIndex = results.findIndex(result => result.appId === appId);

    if (existingAppIndex >= 0) {
      results[existingAppIndex] = Object.assign(results[existingAppIndex], website);
    } else {
      results.push(website)
    }
  }

  return results;
}

export default getResults;
