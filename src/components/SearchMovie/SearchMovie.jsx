import noImg from './img/no_poster.jpg'
import noVideo from './img/noVideo.jpg'


import React, {Component, useState, useEffect} from 'react'
import s from './SearchMovie.module.css';
import {Field, reset, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import axios from "axios";


let delay = (ms) => new Promise((res) => setTimeout(() => res(), ms));


let FormMovie = (props) => {
    return <form onsclassName={s.formSearch} onSubmit={props.handleSubmit}>
        <Field className={s.searchInput} name="movieName" component={Input} type='text'
               placeholder="Введите название фильма"/>
        <button onClick={() => reset} className={s.btnSearch}>Поиск</button>
    </form>
}


const afterSubmit = (result, dispatch) =>
    dispatch(reset('movie'));

FormMovie = reduxForm({form: "movie", onSubmitSuccess: afterSubmit})(FormMovie);


let PopUp = ({id, name, title, release_date, popUpOf, media_type, poster_path, vote_average, overview}) => {
    const [link, setLink] = useState('0');

    (release_date === undefined) && (release_date = "Нам пока не известна");
    if (poster_path != null) {
        poster_path = 'https://image.tmdb.org/t/p/original' + poster_path;
    } else {
        poster_path = noImg;
    }
    // Далее прописываем аналог componentDidMount
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=b8af74b0a4e83b8c71f1deb2c4a36ca9&language=ru`)
            .then(response => {
                if (response.data.results.length !== 0) {
                    setLink(`https://www.${response.data.results[0].site}.com/embed/${response.data.results[0].key}`)
                } else {
                    setLink(noVideo)
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response)
                } else if (error.request) {
                    console.log(error.request)
                }
            })
    }, []);


    return <div className={s.popup}>

        <button className={s.btn} onClick={() => popUpOf()}>X</button>

        <div className={s.picContainer}>
            <img src={poster_path} className={s.miniPoster}/>
        </div>


        <div className={s.textPopup}>
            <div className={s.infoMovie}>
                <div className={s.titleinfo}>{(title !== undefined) ? title : name}</div>
                <div>Дата релиза: {release_date} </div>
                <div>Оценка пользователей: {vote_average} </div>
                <div className={s.descript}>
                    {overview}
                </div>
            </div>
        </div>


        <div className={s.video}>
            <iframe src={link} frameBorder="0" allowFullScreen/>
        </div>

    </div>
}

let Item = ({title, poster_path, name, id, handleClick}) => {
    if (poster_path != null) {
        poster_path = 'https://image.tmdb.org/t/p/original' + poster_path;
    } else {
        poster_path = noImg;
    }
    return <div onClick={() => handleClick(id)} className={s.blockMovie}>

        <img className={s.pic} src={poster_path}/>
        <div className={s.titleMovie}>{(title !== undefined) ? title : name}</div>
    </div>
}


class SearchMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            recomendation: true,
            moviesRecomendation: [],
            popUp: false,
            idPopUp: null,
        }
        this.searchOn = this.searchOn.bind(this)
    }

    handleClick(id) {
        this.setState({
            idPopUp: id,
            popUp: true,
        })
    }
    downloadRecomendation(){
            axios.get('https://api.themoviedb.org/3/trending/all/week?api_key=b8af74b0a4e83b8c71f1deb2c4a36ca9&language=ru')
                .then(response => {
                    if (response.status !== 200) {
                        return Promise.reject();
                    }
                    // console.log(response.data.results);
                    this.setState({
                        moviesRecomendation: [...response.data.results]
                    })
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response)
                    } else if (error.request) {
                        console.log(error.request)
                    }
                })
}

    componentDidMount() {
        this.downloadRecomendation()
    }

    popUpOf() {
        this.setState({
            popUp: false,
        })
    }

    searchOn(movie) {
        this.setState({
            search: movie.movieName
        })
    }

    clickOnMain() {
        this.setState({
            recomendation: true
        })
        this.downloadRecomendation()
    }

    searchMovie() {
        const keyId = "b8af74b0a4e83b8c71f1deb2c4a36ca9";
        const search = this.state.search;
        const urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=${keyId}&language=ru&query=`;
        axios.get(urlSearch + search)
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject();
                }
                this.setState({
                    moviesRecomendation: [...response.data.results],
                    recomendation: false,
                    search: false
                })
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response)
                } else if (error.request) {
                    console.log(error.request)
                }
            })
    }


    render() {
        console.log(this.state.moviesRecomendation);
        let {recomendation, moviesRecomendation, popUp, idPopUp, search} = this.state;
        {
            (search) && this.searchMovie()
        }
        let isMovie = moviesRecomendation.find(movie => movie.id === idPopUp);

        return <div className={s.bg}>
            <nav className={s.navbarSearch}>
                <div className={s.title}>
                    <div onClick={()=>this.clickOnMain()}>МОЙ ПОИСКОВИК ФИЛЬМОВ</div>
                </div>
                <div><FormMovie onSubmit={this.searchOn}/></div>
            </nav>

            {(recomendation) &&
            <div className={s.recommendation}>Рекомендуем к просмотру</div>}

            <main>
                <div className={s.mainList}>
                    {moviesRecomendation.map((dataMovie, i) =>
                        <Item key={i} {...dataMovie} handleClick={(id) => this.handleClick(id)}/>)
                    }
                </div>
            </main>
            {(popUp) &&
            [<PopUp {...isMovie} popUpOf={() => this.popUpOf()}/>, <div className={s.overlay}></div>]}
        </div>
    }
}


export default SearchMovie;
