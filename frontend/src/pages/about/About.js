import React, { useEffect, useState } from 'react';

import { useRouteContext } from '../../context/route/RouteProvider';
import { useGlobalContext } from '../../context/bpikd/GlobalState';
/* import "./news.scss"; */
import { ContentComponent } from '../../components/ContentComponent';

const About = () => {
  const { state } = useRouteContext();

  const { posts, listPosts, getPostById } = useGlobalContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listPosts(setLoading, 'About');
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
      {posts?.map((news) => {
        if (news.isPublished) {
          return (
            <div className='news-content box' key={news.id}>
              <div className='news-header mt-2'>
                <h3
                  className='h3'
                  /*   onClick={() => onClickHandler(news.id, news.title)} */
                >
                  {news.title}
                </h3>
                {/*  <span className='news-date'>
                  {moment(news?.scheduledPublishTime).format('DD MMMM YYYY')}
                </span> */}
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
      })}
    </section>
  );
};
export default About;
