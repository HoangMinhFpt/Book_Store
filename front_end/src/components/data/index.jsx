import {
  faFacebookF,
  faGithub,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationDot,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const data = {
  banner: [
    {
      to: "/link",
      img: "https://as2.ftcdn.net/v2/jpg/06/88/66/31/1000_F_688663136_CYDZXf10utvUG7QScsByISc5AaEDf68F.jpg",
      title: "First slide label",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum",
    },
    {
      to: "/link",
      img: "https://as1.ftcdn.net/v2/jpg/07/58/80/14/1000_F_758801412_5tqrZPS7WOo275E8xNJdl45X2QbAVhQz.jpg",
      title: "Second slide label",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      to: "/link",
      img: "https://as1.ftcdn.net/v2/jpg/06/88/66/30/1000_F_688663081_cU0jEls4GKDvdJNOv6p7y6M6BJcu6aWH.jpg",
      title: "Third slide label",
      description: " Praesent commodo cursus magna, vel scelerisque nisl.",
    },
  ],

  collection: [
    {
      img: "https://as2.ftcdn.net/v2/jpg/05/76/50/93/1000_F_576509342_G5iMJtZf7I7HiCG06SbtJ8f9wWPkBHrz.jpg",
      title: "collection one",
      description: "new trending",
    },
    {
      img: "https://as1.ftcdn.net/v2/jpg/05/77/38/60/1000_F_577386077_qeEWUSQwyLvVLFLf9vjnRuCfSitbv9uB.jpg",
      title: "collection two",
      description: "high performance",
    },
  ],
  products: [
    {
      id: 1,
      sku: "FAS-01",
      link: "/product/detail",
      name: "Great product name goes here",
      img: "https://aero-theme.myshopify.com/cdn/shop/products/10-600x600_a19d3308-c9ac-40fa-ae8e-853a378e0592_900x900_crop_center.jpg?v=1519629467",
      originPrice: 20000000,
      discountPercentage: 10,
      isNew: true,
      isHot: false,
      star: 1,
      review: 4,
      isFreeShipping: true,
      description:
        "Nulla sodales sit amet orci eu vehicula. Curabitur metus velit, fermentum a velit ac, sodales egestas lacus. Etiam congue velit vel luctus dictum. Pellentesque at pellentesque sapien.",
    },
    {
      id: 2,
      sku: "FAS-02",
      link: "/product/detail",
      name: "Great product name goes here",
      img: "https://aero-theme.myshopify.com/cdn/shop/products/13-600x600_e2c0d9e9-0178-41e0-8aef-c479f8d085ac_900x900_crop_center.jpg?v=1519629467",

      originPrice: 55520000,
      discountPercentage: 25,
      isNew: false,
      isHot: true,
      star: 3,
      review: 5,
      isFreeShipping: true,
      description:
        "Maecenas suscipit volutpat gravida. Nulla hendrerit nisi a lectus blandit aliquam. Integer enim magna, consequat sed justo nec, auctor sagittis urna.",
    },
    {
      id: 3,
      sku: "FAS-03",
      link: "/product/detail",
      name: "Great product name goes here",
      img: "https://aero-theme.myshopify.com/cdn/shop/products/9-600x600_fa568c03-b09d-4d07-8f3e-7073a98286dc_900x900_crop_center.jpg?v=1519629467",

      originPrice: 20000000,
      discountPercentage: 20,
      isNew: true,
      isHot: true,
      star: 2,
      review: 4,
      isFreeShipping: true,
      description:
        "Vivamus sapien eros, molestie sed lacus vitae, lacinia volutpat ipsum. Nam sollicitudin lorem eget ornare vulputate.",
    },
    {
      id: 4,
      sku: "FAS-04",
      link: "/product/detail",
      name: "Great product name goes here",
      img: "https://aero-theme.myshopify.com/cdn/shop/products/3-600x600_41086c79-e865-4c8c-aa93-15a03b384a3e_900x900_crop_center.jpg?v=1519629502",
      originPrice: 12000000,
      discountPercentage: 10,
      isNew: false,
      isHot: false,
      star: 5,
      review: 2,
      isFreeShipping: false,
      description:
        "Morbi lobortis velit non consectetur porta.|Duis auctor risus ac purus vehicula tempor.|Fusce at ipsum a leo tempor malesuada.|Curabitur tincidunt justo vel volutpat suscipit.",
    },
    {
      id: 5,
      sku: "FAS-04",
      link: "/product/detail",
      name: "Great product name goes here",
      img: "https://aero-theme.myshopify.com/cdn/shop/products/14-600x600_d4f6d321-f84e-4b64-8856-d6f46623dc3b_900x900_crop_center.jpg?v=1519629467",
      originPrice: 10500000,
      discountPercentage: 20,
      isNew: false,
      isHot: false,
      star: 4,
      review: 1,
      isFreeShipping: false,
      description:
        "Morbi lobortis velit non consectetur porta.|Duis auctor risus ac purus vehicula tempor.|Fusce at ipsum a leo tempor malesuada.|Curabitur tincidunt justo vel volutpat suscipit.",
    },
    {
      id: 6,
      sku: "FAS-04",
      link: "/product/detail",
      name: "Great product name goes here",
      img: "https://aero-theme.myshopify.com/cdn/shop/products/18-600x600_58475fd5-e37b-4ce8-9d8a-3e3ed125fcb6_900x900_crop_center.jpg?v=1519629467",
      originPrice: 12000000,
      discountPercentage: 10,
      isNew: false,
      isHot: false,
      star: 3,
      review: 55,
      isFreeShipping: false,
      description:
        "Morbi lobortis velit non consectetur porta.|Duis auctor risus ac purus vehicula tempor.|Fusce at ipsum a leo tempor malesuada.|Curabitur tincidunt justo vel volutpat suscipit.",
    },
  ],
  blogBanner: [
    {
      img: "https://aero-theme.myshopify.com/cdn/shop/articles/post1-270x334.jpg?v=1519516270",
      title: "First slide label",
      date: "08/28/2023",
      author: "MinhNH",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum",
    },
    {
      img: "https://aero-theme.myshopify.com/cdn/shop/articles/post2-270x334.jpg?v=1519516260",
      title: "Second slide label",
      author: "MinhNH",
      date: "08/28/2023",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: "https://aero-theme.myshopify.com/cdn/shop/articles/post1-270x334.jpg?v=1519516270",
      title: "Third slide label",
      author: "MinhNH",
      date: "08/28",
      description: "Praesent commodo cursus magna, vel scelerisque nisl.",
    },
  ],
  blogList: [
    {
      to: "/blog/detail",
      img: "../../images/blog/nature-1.webp",
      title:
        "It is a long established fact that a reader will be distracted by the readable content",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      publishDate: "Jul 05, 2020",
      tags: ["Branding", "Design"],
      commentCount: 2,
    },
    {
      to: "/blog/detail",
      img: "../../images/blog/nature-2.webp",
      title:
        "Contrary to popular belief, Lorem Ipsum is not simply random text",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
      publishDate: "Aug 05, 2020",
      tags: ["Branding", "Design"],
      commentCount: 3,
    },
    {
      to: "/",
      img: "../../images/blog/nature-3.webp",
      title: "The standard chunk of Lorem Ipsum used since the 1500s",
      description:
        "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
      publishDate: "Sep 05, 2020",
      tags: ["Branding", "Design"],
      commentCount: 4,
    },
  ],
  textFooter: {
    description:
      "We are a team of designers and developers who creates high quality premium Shopify themes.",
    contact: [
      {
        title: "address",
        icon: <FontAwesomeIcon icon={faLocationDot} className="icon-contact" />,
        text: "Long An",
      },
      {
        title: "phone",
        icon: (
          <FontAwesomeIcon icon={faMobileScreen} className="icon-contact" />
        ),
        text: "0123456789",
      },
      {
        title: "email",
        icon: (
          <FontAwesomeIcon
            icon={faEnvelope}
            className="icon-contact"
            size="xs"
          />
        ),
        text: "abc@gmail.com",
      },
    ],
    content: {
      title: "Main menu",
      menu: [
        {
          title: "home",
          link: "/",
        },
        {
          title: "book",
          link: "/book",
        },
        {
          title: "account",
          link: "/profile",
        },
        {
          title: "wishlist",
          link: "/wishlist",
        },
      ],
    },
    linkFollow: [
      {
        icon: <FontAwesomeIcon icon={faFacebookF} />,
      },
      {
        icon: <FontAwesomeIcon icon={faTwitter} />,
      },
      {
        icon: <FontAwesomeIcon icon={faInstagram} />,
      },
      {
        icon: <FontAwesomeIcon icon={faGithub} />,
      },
    ],
  },
  category: [
    {
      id: "1",
      type: "tire",
      to: "/",
    },
    {
      id: "2",
      type: "brake",
      to: "/",
    },
    {
      id: "3",
      type: "exhaust pipe",
      to: "/",
    },
    {
      id: "4",
      type: "light",
      to: "/",
    },
    {
      id: "5",
      type: "shock absorbers",
      to: "/",
    },
  ],
  color: [
    { id: "1", name: "red" },
    { id: "2", name: "green" },
    { id: "3", name: "black" },
    { id: "4", name: "white" },
    { id: "5", name: "blue" },
  ],
  price: [
    { id: "1", from: "0", to: "500000" },
    { id: "2", from: "1000000", to: "1500000" },
    { id: "3", from: "1500000", to: "2500000" },
    { id: "4", from: "2500000", to: "500000" },
    { id: "5", from: "5000000", to: "50000000" },
  ],
  reviewStart: [
    { id: "1", start: 1 },
    { id: "2", start: 2 },
    { id: "3", start: 3 },
    { id: "4", start: 4 },
    { id: "5", start: 5 },
  ],
};
