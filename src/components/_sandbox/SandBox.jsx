import React from 'react';
import s from './SandBox.module.css';
import comboStyle from 'classnames';
import {v4} from 'uuid'



const Star = (props) =>
    <div className={(props.selected) ? comboStyle(s.star, s.selected) : s.star}
         onClick={props.onClick}>
    </div>

const StarRating = ({starsSelected=0, totalStars=5, onRate=f=>f}) =>
    <div className="star-rating">
        {[...Array(totalStars)].map((n, i) =>
            <Star key={i}
                  selected={i<starsSelected}
                  onClick={() => onRate(i+1)}/>
        )}
        <p>{starsSelected} of {totalStars} stars</p>
    </div>


export class Color extends React.Component {

    componentWillMount() {
        this.style = {backgroundColor: "#CCC", paddingBottom:'5px'}
    }

    shouldComponentUpdate(nextProps) {
        const { rating } = this.props
        return rating !== nextProps.rating
    }
    componentWillUpdate() {
        this.style = null
    }

    componentDidUpdate(prevProps) {
        const { title, rating } = this.props
        const status = (rating > prevProps.rating) ? 'better' : 'worse'
        console.log(`${title} is getting ${status}`)
    }

    render() {
        const {title, rating, color, onRate, onRemove} = this.props
        return <section className="color" style={this.style}>
            <div className={s.colorHead}>
                <h1 className={s.nameColor}>{title}</h1>
                <button className={s.deleteBut} onClick={onRemove}>X</button>
            </div>

            <div className={s.color}
                 style={{backgroundColor: color}}
            >
            </div>
            <div>
                <StarRating starsSelected={rating} onRate={onRate}/>
            </div>
        </section>
    }
}









const AddColorForm = ({onNewColor = (f) => f}) => {
    let _title, _color;
    const submit = (e) => {
        e.preventDefault();
        onNewColor(_title.value, _color.value);
        _title.value = '';
        _color.value = '#000000';
        _title.focus();
    }
    return (
        <form onSubmit={submit}>
            <input ref={input => _title = input}
                   type="text"
                   placeholder="color title..." required/>
            <input ref={input => _color = input}
                   className={s.colorType}
                   type="color" required/>
            <button>ADD</button>
        </form>
    )
}


const ColorList = ({ colors=[], onRate=f=>f, onRemove=f=>f }) =>
    <div className="color-list">
        {(colors.length === 0) ?
            <p>No Colors Listed. (Add a Color)</p> :
            colors.map(color =>
                <Color key={color.id}
                       {...color}
                       onRate={(rating) => onRate(color.id, rating)}
                       onRemove={() => onRemove(color.id)} />
            )
        }
    </div>



class SandBox  extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            colors:[]
        }
        this.addColor = this.addColor.bind(this)
        this.rateColor = this.rateColor.bind(this)
        this.removeColor = this.removeColor.bind(this)
    }
    addColor (title, color){
        const colors = [
            ...this.state.colors,
            {
                id: v4(),
                title,
                color,
                rating: 0
            }
        ]
        this.setState({colors})
    }
    rateColor(id, rating) {
        const colors = this.state.colors.map(color =>
            (color.id !== id) ?
                color :
                {
                    ...color,
                    rating
                }
        )
        this.setState({colors})
    }
    removeColor(id) {
        const colors = this.state.colors.filter(
            color => color.id !== id
        )
        this.setState({colors})
    }
    render() {
        return (
            <div className="app">
                <AddColorForm onNewColor={this.addColor} />
                <ColorList colors={this.state.colors}
                           onRate={this.rateColor}
                           onRemove={this.removeColor} />

            </div>
        )
    }
}


export default SandBox







