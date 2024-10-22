import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './personOfInterst.scss';
import { useRouteContext } from '../../context/route/RouteProvider';
import { slugify } from '../../utils/slugify';
import { useGlobalContext } from '../../context/persons/GlobalState';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const PersonOfInterest = () => {
  const { state } = useRouteContext();

  useEffect(() => {
    listAuthors(setLoading);
  }, []);

  const [loading, setLoading] = useState(false);

  const { routes } = state.headersData;
  const navigate = useNavigate();

  const { listAuthors, authors } = useGlobalContext();

  const handleAuthorClick = (author) => {
    const fullName = slugify(author.firstName + '-' + author.lastName);

    if (!author.placeholder) {
      window.open(
        `/person-of-interest/${fullName}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <section className='persons'>
      <div className='container'>
        <h2>{routes.person}</h2>
        <div
          className='grid grid-5'
          style={{ columnGap: '18px', rowGap: '25px' }}
        >
          {authors?.map((author, index) => {
            const fullName = slugify(author.firstName + '-' + author.lastName);

            return (
              <Link
                to={`/person-of-interest/${fullName}`}
                key={'aut456' + author._id + index}
              >
                <div className='img-container'>
                  {author && author.featured ? (
                    <>
                      <img
                        src={author.featured}
                        alt=''
                        className='img-fluid w-100'
                      />
                      <h5>
                        {author.firstName} <br /> {author.lastName}
                      </h5>
                    </>
                  ) : (
                    <>
                      <LazyLoadImage
                        src='/assets/no-picture.png' // This is the image to be lazy loaded
                        alt='No author available' // Alternative text for the image
                        style={{
                          border: '1px solid #eee',
                        }}
                        className='lazy-load'
                      />
                      <h5
                        style={{
                          padding: '5px 25px',
                          background: 'transparent',
                          width: '100%',
                        }}
                      >
                        {author.firstName} <br /> {author.lastName}
                      </h5>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PersonOfInterest;
