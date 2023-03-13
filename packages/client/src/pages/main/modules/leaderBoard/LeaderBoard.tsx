import React, { useState, useEffect } from 'react'
import styles from './leaderBoard.module.scss'
import Container from 'react-bootstrap/Container'
import DataTable, { TableColumn } from 'react-data-table-component'
import dummyData from './dummy.json'
import { TopPlayerCard } from './components/TopPlayerCard'
import { LeaderBoardAvatar } from './components/LeaderBoardAvatar'

interface IDataRow {
  rank: number;
  avatar: string;
  user: string;
  score: number;
}

export interface IData extends IDataRow {
  id: number | string;
}

const LeaderBoard: React.FC = () => {
  const [topPlayersData, setTopPlayersData] = useState<IData[]>([]);
  const data = dummyData;
  const columns: TableColumn<IDataRow>[] = [
    {
      name: 'Rank',
      selector: row => row.rank,
      sortable: true,
    },
    {
      name: 'Avatar',
      cell: row => <LeaderBoardAvatar avatar={row.avatar}/>,
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
  ];

  useEffect(() => {
    const topPlayers = dummyData.sort((a, b) => b.score - a.score).slice(0, 3);
    setTopPlayersData(topPlayers);
  }, [dummyData])

  return (
    <div className={styles.board}>
      <div className={styles.boardCircle}>
        <Container className={`p-5 d-flex flex-column ${styles.container}`}>
          <div className={styles.wrapperTop}>
            <h1 className='mb-3'>Top Players</h1>
            <div className='d-flex justify-content-evenly mb-3'>
              {topPlayersData && topPlayersData.map(data => <TopPlayerCard key={data.id} {...data}/>)} 
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

export default LeaderBoard
