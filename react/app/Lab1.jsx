import React from 'react';
import CostumInput from '../less/kinobase.less';
import StarRating from './components/StarRating.jsx';
import TrianglePaginator from './components/TrianglePaginator.jsx';
import DigitalScoreboard from './components/DigitalScoreboard.jsx';
import CommentsList from './components/CommentsList.jsx';
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
        this.comments = [
            new Comment('TritonGrown','spiderman_avatar.png','26.05.2012 в 18:40',true,'Фельмище супер,а для тех кто любит гонки вообще найлучшое что может бить.Для семейного просмотра тоже идеал.Фильм + 5 '),
            new Comment('TritonGrown','spiderman_avatar.png','26.05.2012 в 18:40',false,'Фельмище супер,а для тех кто любит гонки вообще найлучшое что может бить.Для семейного просмотра тоже идеал.Фильм + 5 '),

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
                    <div className="films_list_block">
                        <div className="film_item">
                            <div className="item_title">Новый Человек-паук (2012)</div>
                            <div className="item_image">
                                <img src="assets/images/spider_man1.png" alt=""/>
                                <StarRating rating={4} max-rating={5}/>
                            </div>
                            <div className="bottom_shadow"></div>
                            <div className="item_details">
                                Получив сверхчеловеческие способности, Питер Паркер пытается вести нормальную жизнь и разобраться, кем же он теперь стал. Но сейчас на нормальную жизнь ...
                            </div>
                            <div className="watch_now">Смотреть сейчас</div>
                        </div>

                        <div className="film_item">
                            <div className="item_title">Авраам Линкольн: Охотник на вампиров (2012)</div>
                            <div className="item_image">
                                <img src="assets/images/lincoln1.png" alt=""/>
                                <StarRating rating={4} max-rating={5}/>
                            </div>
                            <div className="bottom_shadow"></div>
                            <div className="item_details">
                                Убита мать президента Линкольна, и все указывает на вампиров. После этой трагедии Линкольн объявляет войну до полного уничтожения ...
                            </div>
                            <div className="watch_now">Смотреть сейчас</div>
                        </div>


                        <div className="film_item">
                            <div className="item_title">Темный рыцарь: Возрождение легенды (2012)</div>
                            <div className="item_image">
                                <img src="assets/images/batman1.png" alt=""/>
                                <StarRating rating={4} max-rating={5}/>
                            </div>
                            <div className="bottom_shadow"></div>
                            <div className="item_details">
                                Восемь лет спустя после событий Темного Рыцаря, в Готэм приходит новый лидер террористов, Бэйн, неся с собой хаос и разрушения ...
                            </div>
                            <div className="watch_now">Смотреть сейчас</div>
                        </div>


                    </div>

                <div className="film_info_block">
                    <div className="section film_info_image">
                        <img src="assets/images/mechanic1.png" alt=""/>
                    </div>
                    <div className="section info_section_title">Актеры:</div>
                    <div className="section info_section">Джейсон Стэтхэм, Дональд Сазерленд, Бен Фостер, Тони Голдуин, Джефф Чейз, Мини Анден, Джеймс Логан, Эдди Дж. Фернандез, Джошуа Бриджуотер, Джон МакКоннелл</div>

                    <div className="section info_section_title">Продюссер:</div>
                    <div className="section info_section">Рене Бессон, Роберт Чартофф, Уильям Чартофф, Роб Кауэн</div>

                    <div className="section info_section_title">Режиссер:</div>
                    <div className="section info_section">Саймон Уэст</div>

                    <div className="section info_section_title">Сценарист:</div>
                    <div className="section info_section">Льюис Джон Карлино, Ричард Уэнк</div>

                    <div className="section info_section">
                    <div className="half_width_block">
                        <div className="info_section_title">Бюджет:</div>
                    <div className="info_section">$40 000 000</div>
                    </div>
                    <div className="half_width_block">
                        <div className="info_section_title">Сборы в мире:</div>
                    <div className="info_section">$40 000 000</div>
                    </div>
                    <div className="half_width_block">
                        <div className="info_section_title">Сборы в США:</div>
                    <div className="info_section">$40 000 000</div>
                    </div>
                    <div className="half_width_block">
                        <div className="info_section_title">Релиз на DVD:</div>
                    <div className="info_section">$40 000 000</div>
                    </div>
                    </div>
                    <div className="section"></div>


                </div>

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
