import Blogwall from './Blogwall.js';

function Homepage() {
    return (
        <div className="Homepage">
            <h2 style={{
                fontSize: '2.5rem',
                textAlign: 'center',
                marginTop: '20px',
                fontWeight: 'bold'
            }}>
                Homepage
            </h2>
            <Blogwall />
        </div>
    );
};

export default Homepage;