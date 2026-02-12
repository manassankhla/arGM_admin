'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

// Type Imports
import type { ProductType } from '@/types/apps/ecommerceTypes'

type Props = {
    productData?: ProductType[]
}

const ProductListTable = ({ productData }: Props) => {
    return (
        <Card>
            <CardContent>
                <Typography variant='h5' className='mb-4'>
                    Product List
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productData && productData.length > 0 ? (
                                productData.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.productName || 'N/A'}</TableCell>
                                        <TableCell>{product.category || 'N/A'}</TableCell>
                                        <TableCell>{product.stock || 0}</TableCell>
                                        <TableCell>${product.price || 0}</TableCell>
                                        <TableCell>{product.status || 'N/A'}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align='center'>
                                        No products found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

export default ProductListTable
