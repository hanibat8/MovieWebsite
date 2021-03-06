import React from 'react';
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import Layout from "../components/UI/Layout";
import Carousal from "../components/Carousal/Carousal";
import CircularScore from "../components/UI/CircularScore";
//import MovieItem from '../components/Movie/MovieItem';
import classes from './SingleMovie.modules.css';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {renderResponseItem} from '../utils/util';
import { useQuery, /*useQueryClient*/ } from 'react-query';
import {auth} from '../firebase-config';
//import {db} from '../firebase-config';
//import {ref,set} from 'firebase/database';
import axios from 'axios';

//import heartIcon from '../assets/heart-outlined.png';
//import bookMarkIcon from '../assets/bookmark_outline.png';
//import heartIconPressed from '../assets/heart.png';
//import boolMarkIconPressed from '../assets/bookmark2.png';
import playIcon from '../assets/controller-play.png';

interface Props{
    category?:string
}

interface Movie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: any;
    budget: number;
    genres: [];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

const mapGenres=(genreArr:[])=>genreArr?.map((genre:{id:number,name:string})=><span key={genre.id} className="single-movie--genre">{`${genre.name}`}</span>);

const SingleMovie:React.FC<Props>=()=>{
    console.log('SingleMovie render');
    const params=useParams();

    let navigate = useNavigate();

    const user = auth.currentUser;

    const navigateToSignUpPage=()=> navigate('/signUp'); 

    const navigateToLoginInForm=()=> navigate('/login');
    
    //const queryClient:any=useQueryClient();
    //let queryClientPopular= queryClient.getQueryData('Popular')?.data?.results;
    //let queryClientUpcoming=queryClient.getQueryData('Upcoming')?.data?.results;
    //let queryClientTopRated=queryClient.getQueryData('Top Rated')?.data?.results;

    /*const getMovieIdForPlaceholderData=(queryClientMovies:[]|null)=>{
            return queryClientMovies?.find((movie:{id:number})=>{
                if(params.movieId==null)
                    return movie.id===+params.movieId}
                );
                
    }

    const getIPlaceholderData=()=>{
        let dataQuery;
        let queryClientArr=[queryClientPopular,queryClientTopRated,queryClientUpcoming];
        
        for(let i=0;i<3;i++){
            dataQuery=getMovieIdForPlaceholderData(queryClientArr[i])
            if(dataQuery)break;
        }

        return dataQuery;
    }*/
    
    const {isLoading,data,isError,error}=useQuery(
        ['movie-id',params['movieId'] && params['movieId'].toString()],
        ()=>axios.get(`https://api.themoviedb.org/3/movie/${params['movieId']}?api_key=5c8ece04ea5e1e31bb7e5630081968b6&language=en-US`),
        {   staleTime:Infinity,
           /* placeholderData: ()=>{let a=queryClient.getQueryData('Popular')?.data?.results.find((movie:{id:number})=> {
                if(params['movieId']!=null) 
                    return movie.id===+params['movieId']})
                console.log(a)
                return a}*/
        });

        let movie:Movie=data && data?.data;
    
    /*const toggleFavHandler=(movie:{id:number})=>{
       //dispatch('TOGGLE_FAV',{movieId:movie.id,category:props.category});
    }

    const toggleWishlistHandler=(movie:{id:number})=>{
        //dispatch('TOGGLE_WISHLIST',{movieId:movie.id,category:props.category});
    }*/

    
    /*const cast=movie?.genres?.map((genre:{id:number,name:string})=>{
            return <MovieItem>
                <div key={genre.id}>
                    <img decoding='async' src="https://www.themoviedb.org/t/p/w138_and_h175_face/hhKZGnu66EXC0nDYzjErMs62ETb.jpg" className='carousal-item--img'/>
                    {genre.name}
                </div>
            </MovieItem>
        });*/

    return(
        <>
            <Header/>
                {(isLoading || isError ) && <div className={'single-movie__container'}>{renderResponseItem(isLoading,error)}</div>} 
                {movie && <> <div className={classes['single-movie__container']} style={{backgroundImage:`linear-gradient(rgba(27, 27, 27, 0.8),rgba(10, 10, 10, 0.8)), url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie?.backdrop_path})`}}>
                            <Layout>
                                <div className={`single-movie--detail__container`}>
                                    <div className={`single-movie--img__container`}>
                                        <img decoding='async' src={`https://www.themoviedb.org/t/p/w440_and_h660_face/`+movie?.poster_path} className={'single-movie--img'}/>
                                    </div>
                                   
                                    <div className={'single-movie--info__container'}>
                                        <h2 className="single-movie--heading">{movie?.original_title}<span className="single-movie--heading--year">{`(${movie?.release_date?.split('-')[0]})`}</span></h2>
                                        <span className="single-movie--date">{movie?.release_date?.split('-').join('/')}</span>
                                        {mapGenres(movie?.genres)}
                                        <span className="single-movie--runtime">{`${movie?.runtime}m`}</span>
                                        
                                        <div className="single-movie--buttons">
                                            <CircularScore score={movie?.vote_average}/>
                                            
                                            <button className="single-movie--button" onClick={user ? /*toggleFavHandler.bind(this,movie)*/()=>{}:navigateToSignUpPage}>
                                                {/*state.favorite && isMovieFavorited(movie?.id) ? <img src={heartIconPressed}/> : <img src={heartIcon}/>*/}
                                            </button>
                                            
                                            <button className="single-movie--button" onClick={user ? /*toggleWishlistHandler.bind(this,movie)*/()=>{}:navigateToLoginInForm}>
                                                {/*state.wishlist && isMovieWishlisted(movie?.id) ? <img src={boolMarkIconPressed}/> : <img src={bookMarkIcon}/>*/}
                                            </button>
                                            
                                            <button className="single-movie--play-button">
                                                <img decoding='async' className="single-movie--play-button--img" src={playIcon}/>
                                                <span>Play Trailer</span>
                                            </button>
                                        </div>
                                    <p className="single-movie--tagline">{movie?.tagline}</p>
                                    
                                    <div className="single-movie--overview">
                                        <h3>Overview</h3>
                                        <p>{movie?.overview}</p>                                    
                                    </div>
                                    
                                    </div>
                                </div>
                            </Layout>
                        </div>
                        <Layout className='single-movie--details__container'>
                            <div className="single-movie--details--cast">
                                <h2>Top Billed Cast</h2>
                                <Carousal>{/*cast*/}</Carousal>
                            </div>
                            
                            <div className="single-movie--detail">
                                <div className="single-movie--detail--single-detail">
                                    <h4 className="single-movie--detail--single-detail--heading">Original Title</h4>
                                    <span className="single-movie--detail--single-detail--value">{movie?.original_title}</span>
                                </div>
                                
                                <div className="single-movie--detail--single-detail">
                                    <h4 className="single-movie--detail--single-detail--heading">Status</h4>
                                    <span className="single-movie--detail--single-detail--value">{movie?.status}</span>
                                </div>
                                
                                <div className="single-movie--detail--single-detail">
                                    <h4 className="single-movie--detail--single-detail--heading">Original Language</h4>
                                    <span className="single-movie--detail--single-detail--value">{movie?.original_language}</span>
                                </div>
                                
                                <div className="single-movie--detail--single-detail">
                                    <h4 className="single-movie--detail--single-detail--heading">Budget</h4>
                                    <span className="single-movie--detail--single-detail--value">{movie?.budget> 0 ? movie?.budget : '-'}</span>
                                </div>
                                
                                <div className="single-movie--detail--single-detail">
                                    <h4 className="single-movie--detail--single-detail--heading">Revenue</h4>
                                    <span className="single-movie--detail--single-detail--value">{movie?.revenue> 0 ? movie?.revenue : '-'}</span>
                                </div>
                            </div>
                        </Layout>
                        </>}
            <Footer/>
        </>
    );
}

export default SingleMovie;