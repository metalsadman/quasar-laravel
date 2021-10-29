<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="name"
      :sort-method="customSort"
      binary-state-sort
    >
      <!-- <template v-slot:header-cell="props">
        <q-th :props="props" :key="props.col.name">
          {{ props.col.label }}
          <template>
            <q-input placeholder="filter" @focus.stop @click.stop/>
          </template>
        </q-th>
      </template>-->
      <template v-slot:header="props">
        <q-tr :props="props">
          <!-- {{props}} -->
          <q-th
            :props="props"
            @hover.native.stop
            v-for="col in props.cols"
            :key="col.name"
            auto-width
          >
            <div class="row inline">
              <div class="column">
                <q-btn
                  flat
                  round
                  dense
                  size="xs"
                  icon="mdi-dots-vertical"
                  @click.stop
                >
                  <q-menu>
                    <div class="q-pa-sm">
                      <q-input
                        dense
                        placeholder="filter"
                        @focus.stop
                        @click.stop
                      ></q-input>
                      <q-btn
                        dense
                        flat
                        label="sort"
                        @click="props.sort(col.name)"
                      />
                    </div>
                  </q-menu>
                </q-btn>
              </div>
              <div class="column">
                <!--  q-pt-xs -->
                <!--  style="padding-top: 2px;" -->
                <p>{{ col.label }}</p>
              </div>
            </div>
          </q-th>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'calories',
          align: 'center',
          label: 'Calories',
          field: 'calories',
          sortable: true
        },
        {
          name: 'fat',
          label: 'Fat (g)',
          field: 'fat',
          sortable: true,
          align: 'center'
        },
        {
          name: 'carbs',
          label: 'Carbs (g)',
          field: 'carbs',
          sortable: true,
          align: 'center'
        }
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65
        }
      ]
    }
  },
  methods: {
    customSort (rows, sortBy, descending) {
      let data = [...rows]

      if (sortBy) {
        data.sort((a, b) => {
          let x = descending ? b : a
          let y = descending ? a : b
          if (sortBy === 'name') {
            // string sort
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
          } else {
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy])
          }
        })
      }

      return data
    }
  }
}
</script>
<style lang="stylus" scoped></style>
