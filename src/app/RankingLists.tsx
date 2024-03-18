import { createClient } from '@/utils/supabase/client';

const RankingLists = async () => {
  const supabase = createClient();
  const { data: rankingLists } = await supabase
    .from('links')
    .select()
    .is('active', true);

  return (
    <div>
      <h1>Ranking Lists</h1> total urls: {rankingLists?.length}
      <span>
        {rankingLists ? (
          <ul>
            {rankingLists.map((rankItem, index) => (
              <li key={index}>
                short_name: {rankItem.nickname} | view: {rankItem.view} <br />
                destination:{' '}
                <a href={rankItem.url || '/'} target="_blank" rel="noreferrer">
                  {rankItem.url}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </span>
    </div>
  );
};

export default RankingLists;
