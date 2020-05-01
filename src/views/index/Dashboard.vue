<template>
  <div>
    <v-row>
      <v-carousel
        :show-arrows="false"
        style="height:200px;margin-top:13px;margin-left:8px;width:98%;"
      >
        <v-carousel-item
          v-for="(item,i) in img"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </v-row>

    <v-row>
      <v-col
        v-for="(item, i) in items"
        :key="i"
        cols="6"
      >
        <v-card
          :color="item.color"
          dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                v-text="item.title"
              ></v-card-title>

              <v-card-subtitle v-text="item.artist"></v-card-subtitle>
            </div>

            <v-avatar
              class="ma-3"
              size="125"
              tile
            >
              <v-img :src="item.src"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-container fluid>
      <v-row
        dense
        style="color:white;"
      >
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title
                v-text="card.title"
                style="color:white;font-size:30px;"
              ></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data: () => ({
    show: false,
    items: [
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People'
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        artist: 'Ellie Goulding'
      }
    ],
    img: [
      {
        src: 'https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_1280.jpg'
      },
      {
        src: 'https://cdn.pixabay.com/photo/2016/01/14/06/09/guitar-1139397_1280.jpg'
      },
      {
        src: 'https://cdn.pixabay.com/photo/2017/11/15/09/28/music-player-2951399_1280.jpg'
      },
      {
        src: 'https://cdn.pixabay.com/photo/2017/10/30/16/38/music-2902891_1280.jpg'
      }
    ],
    cards: [
      {
        title: 'Favorite road trips',
        src: 'https://images.unsplash.com/photo-1511367734837-f2956f0d8020?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        flex: 6
      },
      {
        title: 'Best airlines',
        src: 'https://images.unsplash.com/photo-1562572159-4efc207f5aff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        flex: 6
      },
      {
        title: 'Best airlines',
        src: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        flex: 6
      },
      {
        title: 'Best airlines',
        src: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        flex: 6
      },
      {
        title: 'Best airlines',
        src: 'https://images.unsplash.com/photo-1564989667369-83a76093ef60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        flex: 6
      }
    ]
  })
}
</script>

<style scoped lang="scss">
.boxd {
  height: 300px;
}
</style>
