import React, { useEffect, useState } from 'react';
import Banner from '../components/banner/Banner';
import { data } from '../components/data';
import Collection from '../components/collection/Collection';
import ModuleTitle from '../components/module/ModuleTitle';
import ViewMore from '../components/collection/ViewMore';
import CardGrip from '../components/card/book/CardGrip';
import Carousel from '../components/banner/Carousel';
import { getBooks } from '../services/BookMange';

const CustomerHomePage = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks({ page: 1, limit: 6 });
                setBooks(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    // console.log(books);
    return (
        <div className="customer-homepage">
            <div className="content">
                <div className='container-home'>
                    <div className="banner-item">
                        <Banner
                            id="carouselBannerHome"
                            data={data.banner}
                        />
                    </div>
                    <div className="collection-item">
                        <Collection
                            id="collectionHome"
                            data={data.collection}
                        />
                    </div>
                </div>

                <div className="container-fluid">
                    <ModuleTitle title="our_product" />
                    <ViewMore redirect={"/book"} />
                    <div className="row">
                        {loading ?
                            <div> loading...</div>
                            :
                            (
                                books && books.map((product, idx) => {
                                    return (
                                        <div className="col-sm-4" key={idx}>
                                            <CardGrip data={product} />
                                        </div>
                                    );
                                })
                            )
                        }
                    </div>
                </div>
                <div className="container-fluid">
                    <ModuleTitle title="best_seller" />
                    <div className="product-best">
                        <Carousel data={books} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CustomerHomePage;
