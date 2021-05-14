import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";

import News from "./News";
import {addNew} from "../../redux/news-reducer";

class NewsContainer extends React.Component {
    render() {
        return <News
            {...this.props}
            news={this.props.news} //отправляем из mapStateToProps state c содержимым news
        />
    }
}

//Далее с помощью mapStateToProps мы получаем из Reducer объект newsState
let mapStateToProps = (state) => {
    return {
        news: state.newsPage.news, // присваиваем свойству news из Reducer - "news-reducer.js" под названием newsPage(мы его назвали так в redux-store.js) свойство содержащий массив объектов
    }
}

export default compose(
    connect(mapStateToProps,{addNew}) // подключаем mapStateToProps и экшены из Reducer("news-reducer.js") в объекте через запятую {addNew, ..., ...,...}, нужно знать еще , что  State достается из контекста с помощью <Provider />
)(NewsContainer)
