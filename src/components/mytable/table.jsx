/* eslint-disable jsx-a11y/anchor-is-valid */
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import * as React from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BlockIcon from '@mui/icons-material/Block';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SearchIcon from '@mui/icons-material/Search';

const rows = [
    {
        id: 'INV-1234',
        date: 'Feb 3, 2023',
        status: 'Refunded',
        customer: {
          initial: 'O',
          name: 'Olivia Ryhe',
          email: 'olivia@email.com',
        },
      },
      {
        id: 'INV-1233',
        date: 'Feb 3, 2023',
        status: 'Paid',
        customer: {
          initial: 'S',
          name: 'Steve Hampton',
          email: 'steve.hamp@email.com',
        },
      },
      {
        id: 'INV-1232',
        date: 'Feb 3, 2023',
        status: 'Refunded',
        customer: {
          initial: 'C',
          name: 'Ciaran Murray',
          email: 'ciaran.murray@email.com',
        },
      },
      {
        id: 'INV-1231',
        date: 'Feb 3, 2023',
        status: 'Refunded',
        customer: {
          initial: 'M',
          name: 'Maria Macdonald',
          email: 'maria.mc@email.com',
        },
      },
      {
        id: 'INV-1230',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
          initial: 'C',
          name: 'Charles Fulton',
          email: 'fulton@email.com',
        },
      },
      {
        id: 'INV-1229',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
          initial: 'J',
          name: 'Jay Hooper',
          email: 'hooper@email.com',
        },
      },
      {
        id: 'INV-1228',
        date: 'Feb 3, 2023',
        status: 'Refunded',
        customer: {
          initial: 'K',
          name: 'Krystal Stevens',
          email: 'k.stevens@email.com',
        },
      },
      {
        id: 'INV-1227',
        date: 'Feb 3, 2023',
        status: 'Paid',
        customer: {
          initial: 'S',
          name: 'Sachin Flynn',
          email: 's.flyn@email.com',
        },
      },
      {
        id: 'INV-1226',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
          initial: 'B',
          name: 'Bradley Rosales',
          email: 'brad123@email.com',
        },
      },
      {
        id: 'INV-1225',
        date: 'Feb 3, 2023',
        status: 'Paid',
        customer: {
          initial: 'O',
          name: 'Olivia Ryhe',
          email: 'olivia@email.com',
        },
      },
      {
        id: 'INV-1224',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
          initial: 'S',
          name: 'Steve Hampton',
          email: 'steve.hamp@email.com',
        },
      },
      {
        id: 'INV-1223',
        date: 'Feb 3, 2023',
        status: 'Paid',
        customer: {
          initial: 'C',
          name: 'Ciaran Murray',
          email: 'ciaran.murray@email.com',
        },
      },
      {
        id: 'INV-1221',
        date: 'Feb 3, 2023',
        status: 'Refunded',
        customer: {
          initial: 'M',
          name: 'Maria Macdonald',
          email: 'maria.mc@email.com',
        },
      },
      {
        id: 'INV-1220',
        date: 'Feb 3, 2023',
        status: 'Paid',
        customer: {
          initial: 'C',
          name: 'Charles Fulton',
          email: 'fulton@email.com',
        },
      },
      {
        id: 'INV-1219',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
          initial: 'J',
          name: 'Jay Hooper',
          email: 'hooper@email.com',
        },
      },
      {
        id: 'INV-1218',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
          initial: 'K',
          name: 'Krystal Stevens',
          email: 'k.stevens@email.com',
        },
      },
      {
        id: 'INV-1217',
        date: 'Feb 3, 2023',
        status: 'Paid',
        customer: {
          initial: 'S',
          name: 'Sachin Flynn',
          email: 's.flyn@email.com',
        },
      },
      {
        id: 'INV-1216',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
          initial: 'B',
          name: 'Bradley Rosales',
          email: 'brad123@email.com',
        },
      },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderTable() {
  const [order, setOrder] = React.useState('desc');
  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="olivia">Olivia Ryhe</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hooper</Option>
        </Select>
      </FormControl>
    </>
  );

  return (
    <>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for order</FormLabel>
          <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? rows.map((row) => row.id) : [],
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === rows.length
                      ? 'primary'
                      : undefined
                  }
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              <th style={{ width: 120, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: 'lg',
                      '& svg': {
                        transition: '0.2s',
                        transform:
                          order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                      },
                    },
                    order === 'desc'
                      ? { '& svg': { transform: 'rotate(0deg)' } }
                      : { '& svg': { transform: 'rotate(180deg)' } },
                  ]}
                >
                  Date
                </Link>
              </th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows
              .slice()
              .sort(getComparator(order, 'date'))
              .map((row) => (
                <tr key={row.id}>
                  <td style={{ textAlign: 'center' }}>
                    <Checkbox
                      size="sm"
                      checked={selected.includes(row.id)}
                      onChange={(event) => {
                        setSelected((prev) =>
                          event.target.checked
                            ? [...prev, row.id]
                            : prev.filter((id) => id !== row.id),
                        );
                      }}
                      sx={{ verticalAlign: 'text-bottom' }}
                    />
                  </td>
                  <td>
                    <Link href="#" color="primary" fontWeight="lg">
                      {row.date}
                    </Link>
                  </td>
                  <td>
                    <Typography
                      noWrap
                      fontWeight="lg"
                      sx={{ textTransform: 'uppercase' }}
                    >
                      {row.id}
                    </Typography>
                  </td>
                  <td>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Avatar
                        size="sm"
                        src={`https://i.pravatar.cc/150?img=${row.customer.initial}`}
                      />
                      <Box>
                        <Typography level="body2" fontWeight="lg">
                          {row.customer.name}
                        </Typography>
                        <Typography level="body2" sx={{ color: 'text.secondary' }}>
                          {row.customer.email}
                        </Typography>
                      </Box>
                    </Box>
                  </td>
                  <td>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={row.status === 'Refunded' ? 'danger' : 'success'}
                      startDecorator={
                        row.status === 'Refunded' ? (
                          <BlockIcon fontSize="small" />
                        ) : (
                          <CheckRoundedIcon fontSize="small" />
                        )
                      }
                    >
                      {row.status}
                    </Chip>
                  </td>
                  <td>
                    <RowMenu />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
}
