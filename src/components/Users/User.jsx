import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/tails.jpg";
import {NavLink} from "react-router-dom";


let User = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div key={user.id} >
            <div className={styles.profileContainer}>
                <span>
                     <div>
                        <NavLink to={'/profile/' + user.id}>
                         <img src={user.photos.small != null ? user.photos.small : userPhoto}
                              className={styles.userPhoto}/>
                        </NavLink>
                     </div>
                     <div>
                         {user.followed
                             ? <button className={styles.button7} disabled={followingInProgress
                                 .some(id => id === user.id)}
                                       onClick={() => {
                                           unfollow(user.id)
                                       }}>
                                 Unfollow</button>
                             : <button className={styles.button7} disabled={followingInProgress.some(id => id === user.id)}
                                       onClick={() => {
                                           follow(user.id)
                                       }}>
                                 Follow</button>}
                     </div>
                </span>
                <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"}</div>
                    </span>
                </span>
            </div>
        </div>
    )
}

export default User;