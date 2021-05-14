import React from 'react';
import Paginator from "./paginator";
import User from "./User";

let Users = ({currentPage, onPageChanged, pageSize, totalUsersCount, ...props}) => {

    return <div>
        <Paginator

        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}


                   />

        {
            props.users.map(u => <User followingInProgress={props.followingInProgress}
                                       follow={props.follow}
                                       unfollow={props.unfollow}
                                       user={u}
                                       key={u.id}
                />
            )
        }
    </div>
}

export default Users;