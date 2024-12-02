import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    MdChevronLeft,
    MdChevronRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from 'react-icons/md'

function CustomTable({
    data,
    columns,
    notFoundComponents,
    notFoundFlagComponents,
    manualPagination = true,
    staticTable = false,
    globalFilter,
    isPagination,
    paginationObj,
    totalCount,
    manualSorting = true,
    onPageChange,
}) {
    const [sorting, setSorting] = useState([])
    const { t } = useTranslation()

    const table = useReactTable(
        staticTable
            ? {
                  data: data,
                  columns,
                  getPaginationRowModel: getPaginationRowModel(),
                  initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
                  state: {
                      sorting,
                      globalFilter,
                  },
                  onSortingChange: setSorting,
                  getCoreRowModel: getCoreRowModel(),
                  getSortedRowModel: getSortedRowModel(),
                  getFilteredRowModel: getFilteredRowModel(),
              }
            : {
                  columns,
                  data,
                  getCoreRowModel: getCoreRowModel(),
                  getPaginationRowModel: isPagination
                      ? getPaginationRowModel()
                      : undefined,
                  initialState: { pagination: paginationObj },
                  pageCount: Math.ceil(totalCount / paginationObj?.pageSize),
                  manualPagination: manualPagination,
                  manualSorting: manualSorting,
                  getSortedRowModel: getSortedRowModel(),
                  state: {
                      sorting,
                  },
                  onSortingChange: setSorting,
              },
    )

    // const [pageNumbers, setPageNumbers] = useState([])
    const [sortingFlag, setSortingFlag] = useState(false)

    useEffect(() => {
        table.setPageIndex(0)
        table.setPageSize(table.getState().pagination.pageSize)
        return () => {}
    }, [globalFilter])

    useEffect(() => {
        if (table.getState().sorting && sortingFlag) {
            setSortingFlag(false)
            onSetFilterData && onSetFilterData(table.getState().sorting[0])
        }
        return () => {}
    }, [table.getState(), sortingFlag])

    useEffect(() => {
        if (!staticTable) {
            table.setPagination(paginationObj)
        }
        return () => {}
    }, [paginationObj])

    return (
        <div className="relative rounded-lg shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-navy-700 dark:text-gray-400 rtl:text-right">
                    <thead className="bg-gray-50 text-xs uppercase text-navy-700 dark:bg-gray-700 dark:text-white">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="px-6 py-3">
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none full-width'
                                                            : 'full-width',
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length === 0 ? (
                            <tr className="border-b odd:bg-white even:bg-gray-50 hover:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                                <td
                                    style={{
                                        textAlign: 'center',
                                        borderBottom: 'none',
                                    }}
                                    colSpan={columns.length}
                                    className="px-6 py-4 text-base font-normal capitalize text-secondaryBlack dark:text-white dark:hover:text-white"
                                >
                                    {notFoundFlagComponents
                                        ? notFoundComponents
                                        : t('NoRecordsFound')}
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <tr
                                        key={row.id}
                                        className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800 dark:hover:bg-gray-600"
                                    >
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    className="px-6 py-4 text-base text-secondaryBlack dark:text-white"
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext(),
                                                    )}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-2 flex h-fit w-full flex-wrap items-center justify-between gap-3 px-6 pb-[20px] pt-[10px]">
                {/* left side */}

                <div className="text-sm text-gray-700">
                    {t('Showing')}{' '}
                    {table.getState().pagination.pageSize *
                        table.getState().pagination.pageIndex +
                        1}{' '}
                    {t('to')}{' '}
                    {table.getState().pagination.pageSize *
                        (table.getState().pagination.pageIndex + 1) <=
                    data.length
                        ? table.getState().pagination.pageSize *
                          (table.getState().pagination.pageIndex + 1)
                        : paginationObj
                          ? data.length +
                            paginationObj?.pageSize * paginationObj?.pageIndex
                          : data.length}{' '}
                    {t('of')} {totalCount} {t('entries')}
                </div>

                <div className="flex items-center gap-3">
                    <p className="> Show rows per page text-sm text-gray-700">
                        {t('ShowRowsPerPage')}{' '}
                    </p>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value))
                            table.setPageIndex(0)
                            onPageChange &&
                                onPageChange(0, Number(e.target.value))
                        }}
                        className="h-[32px] w-[75px] rounded-[20px] border border-gray-200 px-2 text-gray-700 dark:!border-white/10 dark:bg-navy-800"
                    >
                        <option value="8">8</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                {/* right side */}
                <div className="flex items-center gap-2">
                    <span>
                        {t('Page')}{' '}
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </strong>{' '}
                    </span>
                    <button
                        onClick={() => {
                            table.setPageIndex(0)
                            onPageChange &&
                                onPageChange(
                                    0,
                                    table.getState().pagination.pageSize,
                                )
                        }}
                        className={`linear text-black flex items-center justify-center rounded-full bg-primary-gradient p-2 text-lg text-[#000] transition duration-200 dark:bg-dark-primary-gradient`}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <MdKeyboardDoubleArrowLeft />
                    </button>{' '}
                    <button
                        onClick={() => {
                            table.previousPage()
                            onPageChange &&
                                onPageChange(
                                    table.getState().pagination.pageIndex - 1,
                                    table.getState().pagination.pageSize,
                                )
                        }}
                        disabled={!table.getCanPreviousPage()}
                        className={`linear text-black flex items-center justify-center rounded-full bg-primary-gradient p-2 text-lg text-[#000] transition duration-200 dark:bg-dark-primary-gradient`}
                    >
                        <MdChevronLeft />
                    </button>
                    <button
                        onClick={() => {
                            table.nextPage()
                            onPageChange &&
                                onPageChange(
                                    table.getState().pagination.pageIndex + 1,
                                    table.getState().pagination.pageSize,
                                )
                        }}
                        className={`linear active:primary text-black flex items-center justify-center rounded-full bg-primary-gradient p-2 text-lg text-[#000] transition duration-200 dark:bg-dark-primary-gradient`}
                        disabled={!table.getCanNextPage()}
                    >
                        <MdChevronRight />
                    </button>
                    <button
                        onClick={() => {
                            table.setPageIndex(table.getPageCount() - 1)
                            onPageChange &&
                                onPageChange(
                                    table.getPageCount() - 1,
                                    table.getState().pagination.pageSize,
                                )
                        }}
                        disabled={!table.getCanNextPage()}
                        className={`linear flex items-center justify-center rounded-full bg-primary-gradient p-2 text-lg text-[#000] transition duration-200 dark:bg-dark-primary-gradient`}
                    >
                        <MdKeyboardDoubleArrowRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomTable
