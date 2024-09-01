'use client'
import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/typo/tabs/index'
import HBI_BreadCrumb from '@/components/base/breadcrumb/HBI_BreadCrumb'
import EditSystemUserFrom from './EditSystemUserFrom'
import 'react-phone-input-2/lib/style.css'

const EditSystemUser = (id) => {
    return (
        <div className="h-[85vh] overflow-hidden p-4 overflow-y-visible">
            <HBI_BreadCrumb
                pageName="SystemUsers"
                items={[
                    { label: 'SystemUsers', href: 'system-users' },
                    { label: 'EditSystemUser' },
                ]}
            ></HBI_BreadCrumb>

            <Tabs defaultValue="general" className="w-full mt-3 ">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <EditSystemUserFrom id={id}></EditSystemUserFrom>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default EditSystemUser
