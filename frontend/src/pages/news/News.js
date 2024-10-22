import React, { useEffect, useState } from 'react';
import { useRouteContext } from '../../context/route/RouteProvider';
import { useGlobalContext } from '../../context/persons/GlobalState';
import './news.scss';
import { ContentComponent } from '../../components/ContentComponent';
import Loader from '../../components/loader/Loader';

const News = () => {
  const { state } = useRouteContext();

  const { posts, listPosts, getPostById } = useGlobalContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listPosts(setLoading, 'News');

    //eslint-disable-next-line
  }, []);

  const onClickHandler = async (id, title) => {
    // Shorten the title to the first 5 words and replace spaces with hyphens
    const shortenedTitle = title.split(' ').slice(0, 5).join('-').toLowerCase();
    // Wait for getPostById to complete before navigating
    await getPostById(id, 'news', setLoading, shortenedTitle);
  };

  return (
    <section className='news container'>
      {loading ? (
        <Loader />
      ) : (
        posts?.map((news) => {
          if (news.isPublished) {
            return (
              <div className='news-content box' key={news.id}>
                <div className='news-header mt-2'>
                  <h3 className='h3'>{news.title}</h3>
                </div>
                <div className='news-body'>
                  {news.featured && (
                    <div className='featured-images'>
                      <img src={news.featured} alt='news '></img>
                    </div>
                  )}
                  <div className='news-description'>
                    <ContentComponent content={news.content} />
                  </div>
                </div>
              </div>
            );
          }
        })
      )}
    </section>
  );
};
export default News;
