import React, { useState, useEffect } from 'react';
import Header from '../components/UI/Header';
import Layout from '../components/UI/Layout';
import {auth,db} from '../firebase-config';
import {ref,onValue } from 'firebase/database';
import classes from './Profile.module.css';
import { renderResponseItem } from '../utils/util';

type movie={
    id: number,
    original_title: string,
    poster_path: string,
    overview:string
}

const Profile=()=>{
    const user = auth.currentUser;

    const [categoryClicked,setCategoryClicked]=useState({
        wishlist:true,
        favorite:false
    });

    const [wishlistMovies,setWishlistMovies]=useState<movie[]>([]);
    const [favMovies,setFavMovies]=useState<movie[]>([]);

    let totalClasses=`${classes[`categories__name`]} ${classes['categories__name--active']}`;

    const categoryClickHandler=()=>{          
            setCategoryClicked((prevState)=>{
                return {
                wishlist:!prevState.wishlist,
                favorite:!prevState.favorite
            }
         })
    }
    
    useEffect(()=>{
        onValue(ref(db, `users/${user?.uid}/wishlist`), (snapshot) => {
            //console.log(Object.values(snapshot.val()));
            snapshot.exists() && setWishlistMovies(Object.values((snapshot.val())))
          }, {
            onlyOnce: true
          });

          onValue(ref(db, `users/${user?.uid}/favorite`), (snapshot) => {
            snapshot.exists() && setFavMovies(Object.values((snapshot.val())))
          }, {
            onlyOnce: true
          });
    },[])

    const favWishlistMovieContent=(arr:movie[])=>{
        let content=arr.map((movieItem)=>{
            return <div className={classes['category__movie']}>
                <div className={classes['category__movie__img__container']}>
                    <img className={classes['category__movie__img']} decoding='async' src={`https://www.themoviedb.org/t/p/w440_and_h660_face/`+movieItem.poster_path}/>
                </div>
                <div className={classes['category__movie__details']}>
                    <h3 >{movieItem.original_title}</h3>
                    <p>{movieItem.overview.split('.')[0]}</p>
                </div>
            </div>
        })

        return content;
    }

    return(
        <React.Fragment>
            <Header/>
            <div className={classes['profile']} style={{backgroundImage:`linear-gradient(rgb(21, 14, 54,.8),rgba(21, 14, 54,.4)), url(https://www.themoviedb.org/assets/2/v4/account_pipes/teal-2b30e621b46abc5f5c1c192b0adfbf81793a9f082d749fc3d20047a4ef10c27f.svg)`}}>
                <Layout className={classes['profile__details']}>
                    <div className={classes['profile__details--circle']}>
                        <span>{user?.email?.slice(0,1).toUpperCase()}</span>
                    </div>
                    <h3 className={classes['profile__details--email']}>{user?.email}</h3>
                </Layout>
            </div>
            <Layout>
                <div className={classes['categories']}> 
                    <button onClick={categoryClickHandler} className={categoryClicked.wishlist? totalClasses: classes['categories__name']}>
                        Wishlist 
                    </button>
                    <button onClick={categoryClickHandler} className={categoryClicked.favorite? totalClasses: classes['categories__name']}>
                        Favorites 
                    </button>
                </div>
                {(!favMovies || !wishlistMovies) && renderResponseItem(true,false)}
                <div className={classes['category__movies']}>
                    {categoryClicked.favorite ? favWishlistMovieContent(favMovies): favWishlistMovieContent(wishlistMovies)}
                </div>

            </Layout>
        </React.Fragment>
    )
}


export default Profile;