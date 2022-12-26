import React from 'react'
import './leaderBoard.scss'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import DataTable, { TableColumn } from 'react-data-table-component'
import dummyData from './dummy.json'

interface DataRow {
  rank: number;
  avatar: string;
  user: string;
  score: number;
}

const LeaderBoard: React.FC = () => {
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Rank',
      selector: row => row.rank,
      sortable: true,
    },
    {
      name: 'Avatar',
      cell: (row) => <img className='table-img' src={row.avatar || defaultAvatar} />,
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

  const data = dummyData;
  const topPlayersData = dummyData.sort((a, b) => b.score - a.score).slice(0, 3);

  return (
    <Container className='p-5 d-flex flex-column'>
      <div className='wrapper-top'>
        <h1 className='mb-3'>Top Players</h1>
        <div className='d-flex justify-content-evenly mb-3'>
          {topPlayersData && topPlayersData.map(data => 
            <Card key={data.id}>
              <Card.Img src={data.avatar} />
              <Card.Body>
                <Card.Title>{data.user}</Card.Title>
                <Card.Text>{data.score}</Card.Text>
              </Card.Body>
            </Card>
          )} 
        </div>
      </div>
      <div className='wrapper-bottom'>
        <h2 className='mb-3'>All Users</h2>
        <DataTable
          columns={columns}
          data={data}
          pagination={true}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5,10]}
        />
      </div>
    </Container>
  )
}

export default LeaderBoard
