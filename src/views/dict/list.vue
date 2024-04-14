<template>
    <CRow>
      <CCol :xs="12">
        <CCard>
          <CCardHeader>
            <strong>列表</strong>
          </CCardHeader>
          <CCardBody>
            <EasyDataTable
                :headers="headers"
                :items="items"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </template>
  
  <script lang="ts" setup>
  import type { Header, Item } from "vue3-easy-data-table";
  import API from "@/services/api"
  
  const list = async () => {
    const { results, count } = await API.dict_list();
    console.log(results);
    console.log(count);
  };
  
  list();
  

  const headers: Header[] = [
    { text: "ID", value: "id" },
    { text: "名称", value: "name", sortable: true},
    { text: "代码", value: "code"},
    { text: "分类代码", value: "category_code"},
    { text: "描述", value: "description"},
    { text: "禁用", value: "disabled"},
  ];
  
  const items: Item[] =  []
  </script>