import React, { useState, useEffect } from 'react'
import styles from './leaderBoard.module.scss'
import Container from 'react-bootstrap/Container'
import DataTable, { TableColumn } from 'react-data-table-component'
import { TopPlayerCard } from './components/TopPlayerCard'
import { LeaderBoardAvatar } from './components/LeaderBoardAvatar'
import { useGetLeaderboardQuery } from '../../../../store/api/yadnex/leader/leaderApi'
import defaultAvatar from '../../../../assets/img/default-avatar.png'
import { Header } from '../../../../modules/header'
import { withErrorBoundary } from '../../../../modules/errorBoundary/withErrorBoundary'
import { RESOURCES_HOST } from '../../../../const/host'

interface IDataRow {
  rank: number;
  avatar: string | null;
  score: number;
  user: string;
}

export interface IData extends IDataRow {
  id: number;
}

const LeaderBoard: React.FC = () => {
  const [topPlayersData, setTopPlayersData] = useState<IData[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const columns: TableColumn<IData>[] = [
    {
      name: 'Rank',
      selector: row => row.rank as number + 1,
      sortable: true,
    },
    {
      name: 'Avatar',
      cell: row => <LeaderBoardAvatar avatar={row.avatar ? row.avatar : defaultAvatar}/>,
      sortable: false,
    },
    {
      name: 'User',
      selector: row => row.user,
      sortable: true,
    },
    {
      name: 'Score',
      selector: row => row.score,
      sortable: true,
    },
  ]

  const {data: queryData} = useGetLeaderboardQuery();

  useEffect(() => {
    const normalizedData = queryData?.map((dataPart, partIndex) => {
      return {
        rank: partIndex,
        score: dataPart.score,
        user: dataPart.userData.login,
        avatar: dataPart.userData.avatar,
        id: dataPart.idUser
      };
    })
    if (!normalizedData) return
    setData(normalizedData)
    const topPlayers = normalizedData.slice(0, 3);
    topPlayers.forEach(player => player.avatar = (player.avatar ? RESOURCES_HOST + player.avatar : defaultAvatar))
    setTopPlayersData(topPlayers);
  }, [queryData])

  return (
    <div className={styles.board}>
      <div className={styles.boardCircle}>
        <div className={styles.headerContainer}>
          <Header />
        </div>
        <Container className={`p-5 d-flex flex-column ${styles.container}`}>
          <div className={styles.wrapperTop}>
            <h1 className='mb-3'>Top Players</h1>
            <div className='d-flex justify-content-evenly mb-3'>
              {topPlayersData && topPlayersData.map(data => <TopPlayerCard key={data.id} {...data}/> )} 
            </div>
          </div>
          <div className={styles.wrapperBottom}>
            <h2 className='mb-3'>All Users</h2>
            <DataTable
              className={styles.table}
              columns={columns}
              data={data}
              pagination={true}
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5,10]}
            />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default withErrorBoundary(LeaderBoard);
