import React from 'react';
import './Header.css';
import Search from '../Search/Search';
import {Fragment} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import {auth} from '../../firebase-config';
import {useAuth} from '../../store/auth-context';
import Layout from './Layout';

const Header=()=>{

    //const user = useAuthUser(["user"], auth);

    const authContext=useAuth();
    const navigate=useNavigate();

    const logoutHandler=()=>{
        console.log(authContext);
        signOut(auth).then(()=>{
            navigate('/')
        }).catch((err)=>alert(err.message));
    }

    return(
        <>
            <div className='header__container'>
                <Layout>
                <div className={`header`}>
                    <div className={`navbar`}>
                        <div className={`navbar__links`}>
                            <div className={`navbar__link`}>
                                Movies
                                <div className={`navbar__link__dropdown`}>
                                    <ul>
                                        <li className={`navbar__list`}>
                                            <Link to='/movies/popularMovies' className={`navbar__list__category`}>Popular</Link>
                                        </li>
                                        <li className={`navbar__list`} >
                                            <Link to='/movies/topRated' className={`navbar__list__category`}>Top Rated</Link>
                                        </li>
                                        <li className={`navbar__list`}>
                                            <Link to='/movies/upcoming' className={`navbar__list__category`}>Upcoming</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={`navbar__link`}>
                                TVShows
                                <div className={`navbar__link__dropdown`}>
                                    <ul>
                                        <li className={`navbar__list`}>
                                            <Link to='/tvShows/popular' className={`navbar__list__category`}>Popular</Link></li>
                                        <li className={`navbar__list`} >
                                            <Link to='/tvShows/topRated' className={`navbar__list__category`}>Top Rated</Link></li>
                                        <li className={`navbar__list`}>
                                            <Link to='/tvShows/upcoming' className={`navbar__list__category`}>Upcoming</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={`navbar__login`}>
                            {!authContext.isLoggedIn&&
                                <Fragment> 
                                    <Link to='/signUp' className={`navbar__link`}>
                                        Join TMDB
                                    </Link>  
                                    <Link to='/logIn' className={`navbar__link`}>
                                        Login
                                    </Link>   
                                </Fragment>
                                }
                            {authContext.isLoggedIn && 
                                <Fragment> 
                                    <Link to='/profile' className={`navbar__link`}>
                                         Profile
                                    </Link> 
                                    <button className={`navbar__btn`} onClick={logoutHandler}>Logout</button>
                                </Fragment>
                            }
                        </div>
                    </div>
                    <Search/>
                </div>
                </Layout>
            </div>
        </>
    )
}

export default Header;