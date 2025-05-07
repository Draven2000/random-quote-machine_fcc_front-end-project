// Redux:
const NEW_MESSAGE = 'NEW_MESSAGE'

// message: author
const messages = {
    "Oscar Wilde": "Be yourself; everyone else is already taken.",
    "Martin Luther King, Jr.": "If I cannot do great things, I can do small things in a great way",
    "Jimmy Dean": "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
    "Marie Curie":"We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained." ,
    "Paulo Coelho": "Writing means sharing. It’s part of the human condition to want to share things thoughts, ideas, opinions.",
    "Adrienne Clarkson": "Each of us is carving a stone, erecting a column, or cutting a piece of stained glass in the construction of something much bigger than ourselves.",
    "Anthony D’Angelo": "Don’t reinvent the wheel, just realign it.",
    "Marie Osmond": "The Lord made us all out of iron. Then he turns up the heat to forge some of us into steel.",
    "Criss Jami" : "Create with the heart; build with the mind.",
    "Malcolm Forbes": "The purpose of education is to replace an empty mind with an open one.",
    "Nemo Nox" : "Rocks in my path? I keep them all. With them I shall build my castle.",
    "Edward Bellamy": "If bread is the first necessity of life, recreation is a close second.",
    "John Wanamaker": "People who cannot find time for recreation are sooner or later to find time for illness.",
    "Johann Wolfgang von Goethe": "Divide and rule, a sound motto. Unite and lead, a better one.",
    "E.M. Forster": "The four characteristics of humanism are curiosity, a free mind, belief in good taste, and belief in the human race.",
    "Carlos Santana": "One day there will be no borders, no boundaries, no flags and no countries and the only passport will be the heart.",
    "Sir Edmund Hillary": "It is not the mountain we conquer but ourselves."
};

// Exclude previous state to ensure new quote is rolled
const getRandomMessage = (excludeKey = null) => {
    const keys = Object.keys(messages).filter(key => key !== excludeKey);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return {
        message: messages[randomKey],
        author: randomKey
      };
};

const initial = getRandomMessage();

const initialState = {
    message: initial.message,
    author: initial.author
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'NEW_MESSAGE':
        // Exclude current state to ensure new quote is rolled
        const random = getRandomMessage(state.author);
        return {
          ...state,
          message: random.message,
          author: random.author
        };
      default:
        return state;
    }
};

const store = Redux.createStore(messageReducer);

// React:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.submitRandomMessage = this.submitRandomMessage.bind(this);
  }

  submitRandomMessage = () => {
    this.props.newRandomMessage();
  };

  render() {
    const tweetQuote = encodeURIComponent(`"${this.props.messages.message}" - ${this.props.messages.author}`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetQuote}`;

    return (
      <div>
        <div class="container mt-5">
            <div class="card shadow text-center p-4" id="quote-box">
                <h1 class="mb-3" id="text">“{this.props.messages.message}”</h1>
                <p id="author" class="text-muted"> - {this.props.messages.author}</p>
                <button id="new-quote" onClick={this.submitRandomMessage} class="btn btn-success me-2" >
                    New Quote</button>
                <div class="mt-4">
                <a id="tweet-quote" href = {tweetUrl} target="_blank" >
                    <button class="btn btn-primary"><i class="fa-brands fa-twitter"></i></button>
                </a>
                </div>
            </div>
        </div>
      </div>
    );
  }
};


const mapStateToProps = (state) => {
  return {messages: state}
};

const mapDispatchToProps = (dispatch) => {
  return {
    newRandomMessage: () => dispatch({ type: NEW_MESSAGE })
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
};

ReactDOM.render(<AppWrapper />, document.getElementById('root'));

// Simple JSX Test
const SimpleApp = () => {
  return <h1>Hello, React with JSX!</h1>;
};

ReactDOM.render(<SimpleApp />, document.getElementById('root'));
