import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { ActionIcon, Flex, Tooltip, Pill } from '@mantine/core';
import { IconEye, IconEdit, IconTrash } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

function DataTable({
  data,
  columns,
  isLoading = false,
  isError = false,
  enableActions = false,
  onView,
  onEdit,
  onDelete,
  statusColors = {},
  customActions,
  ...tableProps
}) {
  const tableColumns = useMemo(() => {
    if (!enableActions) return columns;
    
    return [
      ...columns,
      {
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        Cell: ({ row }) => (
          <Flex gap="md">
            {onView && (
              <Tooltip label="View">
                <ActionIcon onClick={() => onView(row.original)}>
                  <IconEye size={18} />
                </ActionIcon>
              </Tooltip>
            )}
            {onEdit && (
              <Tooltip label="Edit">
                <ActionIcon color="blue" onClick={() => onEdit(row.original)}>
                  <IconEdit size={18} />
                </ActionIcon>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip label="Delete">
                <ActionIcon color="red" onClick={() => onDelete(row.original)}>
                  <IconTrash size={18} />
                </ActionIcon>
              </Tooltip>
            )}
            {customActions?.(row.original)}
            {row.original.status && (
              <Pill bg={statusColors[row.original.status] || '#FFDB58'} size="sm">
                {row.original.status}
              </Pill>
            )}
          </Flex>
        ),
      },
    ];
  }, [columns, enableActions, onView, onEdit, onDelete, customActions, statusColors]);

  const table = useMantineReactTable({
    columns: tableColumns,
    data,
    enableStickyHeader: true,
    mantineToolbarAlertBannerProps: isError
      ? { color: 'red', children: 'Error loading data' }
      : undefined,
    state: {
      isLoading,
      showAlertBanner: isError,
    },
    ...tableProps,
  });

  return <MantineReactTable table={table} />;
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  enableActions: PropTypes.bool,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  statusColors: PropTypes.object,
  customActions: PropTypes.func,
};

export default DataTable;