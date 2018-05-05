import background from '../images/background.png';

const style = {
  team: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  well: {
    background: 'rgba(28,28,28,0.3)'
  },
  panel: {
    background: 'rgba(37,37,37,0.9)',
    chat: {
      height: '400px',
      overflow: 'scroll'
    }
  }
};
export default style;
