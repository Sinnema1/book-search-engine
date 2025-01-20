import { useQuery, useMutation } from '@apollo/client';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: 'network-only', // Ensures fresh data is fetched on every load
  });
  const [removeBook] = useMutation(REMOVE_BOOK);

  // Function to delete a saved book
  const handleDeleteBook = async (bookId: string) => {
    try {
      const { data } = await removeBook({
        variables: { bookId },
        update(cache) {
          const existingData: any = cache.readQuery({ query: GET_ME });
          if (existingData?.me?.savedBooks) {
            const updatedBooks = existingData.me.savedBooks.filter(
              (book: { bookId: string }) => book.bookId !== bookId
            );
            cache.writeQuery({
              query: GET_ME,
              data: {
                me: {
                  ...existingData.me,
                  savedBooks: updatedBooks,
                },
              },
            });
          }
        },
      });

      if (data?.removeBook) {
        removeBookId(bookId);
      }
    } catch (err) {
      console.error('Error removing book:', err);
    }
  };

  // Show loading spinner or error messages
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  const userData = data?.me;

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>
            {userData?.username
              ? `Viewing ${userData.username}'s saved books!`
              : 'Viewing saved books!'}
          </h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData?.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData?.savedBooks?.map((book: any) => (
            <Col md="4" key={book.bookId}>
              <Card border="dark">
                {book.image && (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;