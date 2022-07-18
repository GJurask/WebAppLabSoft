namespace WebApplication2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class work_1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SampleInfo",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SampleId = c.Int(nullable: false),
                        Identification = c.String(),
                        Value = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Sample", t => t.SampleId, cascadeDelete: true)
                .Index(t => t.SampleId);
            
            CreateTable(
                "dbo.Sample",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Identification = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SampleInfo", "SampleId", "dbo.Sample");
            DropIndex("dbo.SampleInfo", new[] { "SampleId" });
            DropTable("dbo.Sample");
            DropTable("dbo.SampleInfo");
        }
    }
}
