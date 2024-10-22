import React, { useEffect, useState } from 'react';

import { useRouteContext } from '../../context/route/RouteProvider';
import { useGlobalContext } from '../../context/persons/GlobalState';
/* import "./news.scss"; */
import { ContentComponent } from '../../components/ContentComponent';

const About = () => {
  const { posts, listPosts, getPostById } = useGlobalContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listPosts(setLoading, 'About');
    //eslint-disable-next-line
  }, []);

  return (
    <section className='news container'>
      {posts?.map((news) => {
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
      })}
    </section>
  );
};
export default About;
