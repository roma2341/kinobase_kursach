import React from 'react';
import CostumInput from '../less/kinobase.less';
import StarRating from './components/StarRating.jsx';
import TrianglePaginator from './components/TrianglePaginator.jsx';
import DigitalScoreboard from './components/DigitalScoreboard.jsx';
import CommentsList from './components/CommentsList.jsx';
import FilmList from './components/FilmList.jsx';
import FilmInfoBlock from './components/FilmInfoBlock.jsx';
class Lab1 extends React.Component {

    constructor(props) {
        super(props);
        var Comment = function(userName,avatar,commentDate,isFirstLevel,commentText){

            this.userName = userName;
            this.avatar = avatar;
            this.commentDate = commentDate;
            this.commentText = commentText;
            this.isFirstLevel = isFirstLevel;

        }
        var FilmItem = function(name,picture,description,rating,buttonText) {
            this.name = name;
            this.picture = picture;
            this.description = description;
            this.rating = rating;
            this.buttonText = buttonText;
        }

        var DetailedFilmItem = function(title,description) {
            this.title = title;
            this.description = description;
        }

        this.currentFilm = {image:"mechanic1.png", details:[
        new DetailedFilmItem("Актеры:","Джейсон Стэтхэм, Дональд Сазерленд, Бен Фостер, Тони Голдуин, Джефф Чейз, Мини Анден, Джеймс Логан, Эдди Дж. Фернандез, Джошуа Бриджуотер, Джон МакКоннелл"),
        new DetailedFilmItem("Продюссер:","Рене Бессон, Роберт Чартофф, Уильям Чартофф, Роб Кауэн"),
        new DetailedFilmItem("Режиссер:","Саймон Уэст"),
        new DetailedFilmItem("Сценарист:","Льюис Джон Карлино, Ричард Уэнк"),
        new DetailedFilmItem(null,[
            new DetailedFilmItem("Бюджет:","$40 000 000"),
            new DetailedFilmItem("Сборы в мире:","$40 000 000"),
            new DetailedFilmItem("Сборы в США:","$40 000 000"),
            new DetailedFilmItem("Релиз на DVD:","$40 000 000")
            ])
        ]};


        this.comments = [
            new Comment('TritonGrown','spiderman_avatar.png','26.05.2012 в 18:40',true,'Фельмище супер,а для тех кто любит гонки вообще найлучшое что может бить.Для семейного просмотра тоже идеал.Фильм + 5 '),
            new Comment('TritonGrown','spiderman_avatar.png','26.05.2012 в 18:40',false,'Фельмище супер,а для тех кто любит гонки вообще найлучшое что может бить.Для семейного просмотра тоже идеал.Фильм + 5 '),

        ]
        var SEE_NOW_ITEM_TEXT = "Смотреть сейчас";

        this.films = [
        new FilmItem("Новый Человек-паук (2012)","spider_man1.png","Получив сверхчеловеческие способности, Питер Паркер пытается вести нормальную жизнь и разобраться, кем же он теперь стал. Но сейчас на нормальную жизнь ..",2,SEE_NOW_ITEM_TEXT),
        new FilmItem("Новый Человек-паук (2012)","lincoln1.png","Получив сверхчеловеческие способности, Питер Паркер пытается вести нормальную жизнь и разобраться, кем же он теперь стал. Но сейчас на нормальную жизнь ..",3,SEE_NOW_ITEM_TEXT),
        new FilmItem("Новый Человек-паук (2012)","batman1.png","Получив сверхчеловеческие способности, Питер Паркер пытается вести нормальную жизнь и разобраться, кем же он теперь стал. Но сейчас на нормальную жизнь ..",4,SEE_NOW_ITEM_TEXT)
        ]






    }

    render() { return <div className="kinobase_component">
        <div className="page_content_wrapper">
        <div className="header">

            <div className="account_and_search_block">

            </div>
            <div className="expectations_rating_title_wrapper">
                <div className="expectations_title">
                    Рейтинг ожиданий
                </div>
            </div>
            <div className="expectations_and_ratings_block_wrapper">
                <div className="expectations_and_ratings_block">
                    <div className="circle item previous_item"></div>
                    <div className="expectations_details_wrapper">
                        <div className="expectations_details">
                            <div className="text_details">
                                <div className="title title_ru">Мадагаскар 3</div>
                                <div className="title title_en">Madagascar 3: Europes Most Wanted</div>
                                <div className="date_and_rate">
                                    <DigitalScoreboard text="07"/>
                                    <div className="month_wrapper">
                                        <div className="on_site">На сайте</div>
                                        <div className="month">Июня</div>
                                    </div>
                                   <StarRating rating={4} max-rating={5}/>
                                    <div className="rate_scale">9,5/10</div>
                                </div>
                                <div className="content">
                                    Бегемотиха Глория, жираф Мелман, зебра Марти и, конечно, лев Алекс решают вернуться в Нью-Йорк после их побега в Африку. Из-за механических инновации пресловутого шимпанзе и сумасшедших пингвинов, весь план рушится. 
                                </div>
                            </div>

                        </div>
                        <div className="expectations_images_preview">
                            <div className="image_item"><img src="assets/images/leo_tiger_preview.png" alt=""/></div>
                            <div className="image_item"><img src="assets/images/spiderman_preview.png" alt=""/></div>
                            <div className="image_item"><img src="assets/images/dictator_preview.png" alt=""/></div>

                        </div>
                    </div>

                    <div className="circle item next_item"></div>
                </div>
            </div>

            <div className="content_block_wrapper">

                <div className="content_block">
                    <div className="content_title"><span>Пусть к вам проникнет наше настроение и останется только хорошее впечатление! </span><h3>Наслаждайтесь просмотр...</h3></div>
                    <div className="left_content_block">
                    <FilmList films={this.films}/>

               <FilmInfoBlock film={this.currentFilm}></FilmInfoBlock>

                    <div className="film_details_block">
                    <div className="short_info_block">
        <div className="details_title ru">ПРОГРАМІСТ</div>
        <div className="details_title en">THE CODER</div>

        <div className="item">Год выпуска:</div>
        <div className="value">1010</div>
                <br/>

        <div className="item">Страна</div>
        <div className="value">Україна</div>
                <br/>

        <div className="item">Жанр</div>
        <div className="value">Боевики, Триллеры, Криминал</div>
                <br/>

        <div className="item">Продолжительность:</div>
        <div className="value">5 років.</div>
                <br/>

        <div className="item">Рейтинг фильма:</div>
        <div className="value">MDB: 6.5 Кинопоиск: 6.72</div>
                <br/>

        <div className="story_label">Сюжет:</div>
        <div className="story_content">
Рома Зінчук очень хорошо знает свое дело. А дело его – кодить. Он наемник, лучший среди лучших. Рома всегда работает один, но ему приходится сотрудничать с молодым парнем. Теперь они команда. Вот только им все равно предстоит вступить в бой друг с другом, из которого хотя бы одному не уйти живым.
        </div>
    </div>
    <div className="playback_area_wrapper">
    <div className="playback_area">
            <img src="assets/images/artur_bishop.png" alt=""/>
        <div className="play_button">
            <img src="assets/images/play_button.png" alt=""/>
        </div>
    </div>
    </div>

    <div className="comments_area">

       <CommentsList comments={this.comments} />

    </div>

    <div className="comment_input_area">
        <textarea className="comment_input" defaultValue="текст..."></textarea>
        <div className="send_comment_button">Отправить сообщение</div>
    </div>

   <TrianglePaginator total-pages={5} current-page={1}/>



    </div>

                </div>

    <div className="right_content_block">
    </div>

                </div>

            </div>

        </div>
    </div>
    </div>
    }


}

export default Lab1;
