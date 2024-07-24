import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAuthor } from '../../services/AuthorManage';
import { getGenre } from '../../services/GenreManage';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import "../../styles/modal/CreateBookModal.scss";

const CreateBookModal = ({ isOpen, toggleModal, onCreate, book, onEdit }) => {
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [title, setTitle] = useState('');
  const [author_id, setAuthor] = useState('');
  const [genre_id, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [imageReview, setImageReview] = useState('');
  const [description, setDescription] = useState('');
  const [published_date, setPublishedDate] = useState('');
  const [stock_quantity, setStockQuantity] = useState('');
  const [biography, setBiography] = useState('');
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, author_id, genre_id, price, image, description, published_date, stock_quantity, biography };
    if (book) {
      onEdit({ ...newBook, book_id: book.book_id });
    } else {
      onCreate(newBook);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (book) {
        setAuthor(book.author_id);
        setGenre(book.genre_id);
        setTitle(book.title);
        setPrice(book.price);
        setImage(book.image);
        setDescription(book.description);
        setPublishedDate(book.published_date);
        setStockQuantity(book.stock_quantity);
        setBiography(book.biography);
        setImageReview('');
      } else {
        setAuthor('');
        setGenre('');
        setTitle('');
        setPrice('');
        setImage(null);
        setDescription('');
        setPublishedDate('');
        setStockQuantity('');
        setBiography('');
        setImageReview(null);
      }
    }
    const fetchAuthor = async () => {
      try {
        const response = await getAuthor({ limit: 5, page: 1 });
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    }
    const fetchGenre = async () => {
      try {
        const response = await getGenre({ page: 1, limit: 5 });
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }

    fetchAuthor();
    fetchGenre();
  }, [isOpen, book]);

  const handleChangeFile = (e) => {
    const fileChoose = e.target.files[0];
    const validImage = ['image/jpg', 'image/jpeg', 'image/png'];
    if (fileChoose && validImage.includes(fileChoose.type)) {

      const readerFile = new FileReader();
      setError('');
      readerFile.onloadend = () => {
        setImage(readerFile.result);
        setImageReview(readerFile.result);
        console.log(readerFile.result);
      }
      readerFile.readAsDataURL(fileChoose);
    } else {
      setError('Please select a valid images files jpg, jpeg')
    }

  }

  if (!isOpen) {
    return null;
  }
  return (
    <Fragment>
      <Modal isOpen={isOpen} toggle={toggleModal} size="lg" className='modal-container-create'>
        <ModalHeader toggle={toggleModal}>Your review</ModalHeader>
        <ModalBody>
          <Form >
            <div className="content-left">
              <FormGroup>
                <Label for="title">Title:</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="author">Author:</Label>
                <Input
                  type='select'
                  id='author'
                  name='author'
                  value={author_id}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                >
                  <option value="">Select an author</option>
                  {authors.data && authors.data.map((author, index) => (
                    <option key={index} value={author.author_id}>
                      {author.author_name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="price">Price:</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="biography">Biography:</Label>
                <Input
                  type='textarea'
                  name="biography"
                  id="biography"
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                />
              </FormGroup>
            </div>
            <div className="content-right">
              <FormGroup>
                <Label for="date">Publish Date:</Label>
                <Input
                  type={book ? "text" : "date"}
                  name="date"
                  id="date"
                  value={published_date}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  {...(book && { disabled: true })}
                />
              </FormGroup>

              <FormGroup>
                <Label for='genre'>Genre:</Label>
                <Input
                  type='select'
                  name='genre'
                  id='genre'
                  value={genre_id}
                  onChange={(e) => setGenre(e.target.value)}
                  required
                >
                  <option value="">Select a genre</option>
                  {genres.data && genres.data.map((genre, index) => (
                    <option key={index} value={genre.genre_id}>
                      {genre.genre_name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for='quantity'>Stock Quanity:</Label>
                <Input
                  name='quantity'
                  id='quantity'
                  type="number"
                  value={stock_quantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for='description'>Description:</Label>
                <Input
                  type='textarea'
                  name='description'
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </FormGroup>
            </div>
          </Form>
          <FormGroup>
            <Label for='image'>Image:</Label>
            <Input
              type="file"
              name='image'
              id='image'
              // value={image}
              accept="image/*"
              onChange={handleChangeFile}
            />
            {error && <p>{error}</p>}
          </FormGroup>
          <div className="image-group">
            <div className="image-selected" >
              {book && book.image && (
                <div>
                  < img className='image' src={`${book.image}`} alt={book.title} />
                </div>
              )}
            </div>

            <FontAwesomeIcon icon={faArrowRight} style={{ display: imageReview && book ? '' : 'none' }} />
            {imageReview && (
              <div>

                <div className="image-review">
                  <img className='image' src={imageReview} alt="Selected" />
                </div>

              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit}>
            {book ? "Update" : "Create"}
          </Button>{' '}
          <Button className='btn-cancel' onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

CreateBookModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  book: PropTypes.object,
  onEdit: PropTypes.func,
  onCreate: PropTypes.func
};

export default CreateBookModal;
