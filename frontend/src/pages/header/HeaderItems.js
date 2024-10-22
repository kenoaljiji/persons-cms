import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouteContext } from '../../context/route/RouteProvider';
import Alerts from '../../components/Alerts';
import './headerItems.scss';
import Loader from '../../components/loader/Loader';

const HeaderItems = () => {
  const { state, changeHeaderAndRoutes } = useRouteContext();
  const { headersData } = state;

  const { routes, logoImgPath } = headersData;

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState('');
  const [imageURL, setImageURL] = useState(logoImgPath ? logoImgPath : '');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (logoImgPath) setImageURL(logoImgPath);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Optionally, display the image preview
    setLogoImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImageURL(previewUrl);

    // No need to reset the file input here
  };

  const clearImage = () => {
    setLogoImage(null);
    setImageURL(''); // Clear image preview
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input
    }
  };

  // Building initial form values based on current routes and buttons state
  const initialValues = {
    ...routes,
  };

  // Creating a dynamic validation schema based on the routes and buttons
  const validationSchema = Yup.object({
    ...Object.keys(routes).reduce((acc, key) => {
      acc[key] = Yup.string().required(`${key} field is required`);
      return acc;
    }, {}),
  });

  const onSubmit = (values, { setSubmitting }) => {
    // Here, dispatch an action to update the routes in your context
    // Assuming you have an action type called "UPDATE_CONFIG"

    // Initialize empty objects for routes
    let routes = {};

    // Separate values into routes  based on the key prefix or specific keys
    Object.keys(values).forEach((key) => {
      if (['person', 'news', 'about', 'partners'].includes(key)) {
        // If the key is one of the routes, add it to the routes object
        routes[key] = values[key];
      }
    });

    const data = {
      routes,
      logoImgPath: logoImage,
    };

    changeHeaderAndRoutes(data, setLoading);

    setSubmitting(false);

    setError(true);
  };

  return (
    <div className='my-5 container header-items'>
      <div className='text-center'>{error && <Alerts />}</div>
      <h2 className='mb-5 pt-3 text-center font-bold'>Header Items</h2>

      <div className=''>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className='justify-content-center'>
                <div className='d-flex justify-content-between border-bottom px-0 pb-1'>
                  <h4>Header Categories</h4>
                  <button
                    style={{ position: 'relative', top: '-10px' }}
                    type='submit'
                    className='btn btn-primary'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Updating...' : 'Update'}
                  </button>
                </div>
                <div className='d-flex justify-content-center'>
                  <div className='w-100 pt-2'>
                    {Object.entries(routes).map(([key, label]) => (
                      <FieldGroup label={label} name={key} key={key} />
                    ))}
                  </div>
                  <div className='featured mt-4'>
                    {imageURL !== '' && (
                      <div
                        className='featured-close'
                        onClick={() => clearImage()}
                      >
                        <i className='fa-solid fa-trash'></i>
                      </div>
                    )}

                    {/* Image upload and display */}
                    {imageURL ? (
                      <img
                        src={imageURL}
                        alt='Featured'
                        style={{
                          width: '220px',
                          height: '100px',
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '250px',
                          height: '100px',
                          border: '2px dashed #ccc',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <span>CHANGE LOGO</span>
                      </div>
                    )}
                    <input
                      type='file'
                      id='featured-image-upload'
                      style={{ display: 'none' }}
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept='image/*' // Accept images only
                    />
                    <label
                      htmlFor='featured-image-upload'
                      className='featured-image-container bg-success text-white p-1 w-100 mt-1 cursor-pointer'
                    >
                      <div className='add-image-placeholder text-center'>
                        <i className='fas fa-plus'></i> <span>CHANGE LOGO</span>
                      </div>
                    </label>
                    {loading && (
                      <div className='mt-5'>
                        <Loader />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const FieldGroup = ({ label, name }) => (
  <div className='mt-3'>
    <div className='mb-3'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3 text-end'>
            <label htmlFor={name} className='form-label pt-2'>
              {label}
            </label>
          </div>
          <div className='col-md-8'>
            <Field type='text' className='form-control' id={name} name={name} />
            <ErrorMessage
              name={name}
              component='div'
              className='text-danger pt-2'
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeaderItems;
